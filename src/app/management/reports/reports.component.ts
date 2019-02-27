import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManagementService} from '../management.service';
import {LoggedUser, Report, ReportedPost} from '../management-models';
import {MatDialog} from '@angular/material';
import {ReportsDialogComponent} from '../reports-dialog/reports-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {BanDialogComponent} from '../ban-dialog/ban-dialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css', '../../posts.css']
})
export class ReportsComponent implements OnInit {
  posts: ReportedPost[];
  page: number;
  showFile: boolean[] = [];
  loggedUser: LoggedUser;


  constructor(private dialog: MatDialog, private route: ActivatedRoute,
              private router: Router, private managementService: ManagementService) {
    this.loggedUser = managementService.getLoggedUser();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.page = +params.get('page');
        this.getReportedPosts();
      });
  }

  getReportedPosts() {
    this.managementService.getReportedPosts(this.page).subscribe(
      posts => {
        if (!posts && this.page !== 1) {
          this.setPage(1);
          return;
        }
        this.posts = posts;
        window.scroll(0, 0);
      });
  }

  setPage(page: number) {
    this.router.navigate(['../' + page], {relativeTo: this.route});
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
      for (const i in this.posts) {
        if (this.posts[i].id === id) {
          this.posts[i].reports = r;
          break;
        }
      }
    });
  }

  deleteDialog(post: ReportedPost) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {item: post.is_op ? post.thread_id : post.id, action: 'delete'},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (post.is_op) {
        this.managementService.deleteThread(post.thread_id).subscribe(
          _ => this.removePost(post));
      } else {
        this.managementService.deletePost(post.id).subscribe(
          _ => this.removePost(post));
      }
    });
  }

  removePost(post: ReportedPost) {
    this.posts = this.posts.filter(p => p.id !== post.id);
  }

  banDialog(id: number) {
    this.dialog.open(BanDialogComponent, {
      width: '600px',
      data: {post_id: id},
      autoFocus: false
    });
  }
}
