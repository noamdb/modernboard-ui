import {Component, OnInit} from '@angular/core';
import {LoggedUser, ManagementPost, ManagementThreadDetail, Report} from '../management-models';
import {ManagementService} from '../management.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RepliesDialogComponent} from '../../shared/replies-dialog/replies-dialog.component';
import {MatDialog} from '@angular/material';
import {ReportsDialogComponent} from '../reports-dialog/reports-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {BanDialogComponent} from '../ban-dialog/ban-dialog.component';

@Component({
  selector: 'app-management-thread-detail',
  templateUrl: './management-thread-detail.component.html',
  styleUrls: ['./management-thread-detail.component.css', '../../posts.css']
})
export class ManagementThreadDetailComponent implements OnInit {
  thread: ManagementThreadDetail;
  showFile: boolean[] = [];
  thread_id: number;
  previewTop: number;
  previewLeft: number;
  postPreview: ManagementPost;
  loggedUser: LoggedUser;

  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute,
              private managementService: ManagementService) {
    this.loggedUser = managementService.getLoggedUser();
  }

  ngOnInit() {
    this.thread_id = +this.route.snapshot.paramMap.get('thread_id');
    this.managementService.getThread(this.thread_id).subscribe(
      t => {
        this.thread = t;
      });
  }

  repliesDialog(replies: number[]): void {
    this.dialog.open(RepliesDialogComponent, {
      // height: '80vh',
      width: '80vw',
      data: {
        posts: this.thread.posts,
        replies: replies
      }
    });
  }

  findPostPreview(event) {
    this.previewTop = event.top;
    this.previewLeft = event.left;
    this.postPreview = this.thread.posts.find(p => {
      return p.id === event.id;
    });
  }

  removePreview() {
    this.postPreview = undefined;
  }

  reportsDialog(id: number, reports: Report[]) {
    const dialogRef = this.dialog.open(ReportsDialogComponent, {
      width: '600px',
      data: {
        reports: reports,
      },
      autoFocus: false,
    });
    // If reports change in the dialog change them in this component
    dialogRef.componentInstance.reportsChange.subscribe(r => {
      for (const i in this.thread.posts) {
        if (this.thread.posts[i].id === id) {
          this.thread.posts[i].reports = r;
          break;
        }
      }
    });
  }

  deleteDialog(post: ManagementPost) {
    const is_thread = this.thread.posts[0].id === post.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {item: is_thread ? this.thread_id : post.id, action: 'delete'},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (is_thread) {
        this.managementService.deleteThread(this.thread_id).subscribe(
          _ => this.router.navigate(['../../'], {relativeTo: this.route}));
      } else {
        this.managementService.deletePost(post.id).subscribe(
          _ => this.removePost(post));
      }
    });
  }

  removePost(post: ManagementPost) {
    this.thread.posts = this.thread.posts.filter(p => p.id !== post.id);
  }

  banDialog(id: number) {
    this.dialog.open(BanDialogComponent, {
      width: '600px',
      data: {post_id: id},
      autoFocus: false
    });
  }

  lockThread(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {item: id, action: 'lock'},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.managementService.toggleLockThread(id).subscribe(
        _ => this.thread.is_locked = !this.thread.is_locked
      );
    });
  }

  stickThread(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {item: id, action: 'stick'},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.managementService.toggleStickyThread(id).subscribe(
        _ => this.thread.is_sticky = !this.thread.is_sticky
      );
    });
  }
}
