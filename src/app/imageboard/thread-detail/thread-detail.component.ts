import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BoardService} from '../../board.service';
import {Post, PostCreate, ThreadDetail} from '../../models';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CreatePostComponent} from '../create-post/create-post.component';
import {environment} from '../../../environments/environment';
import {RepliesDialogComponent} from '../../shared/replies-dialog/replies-dialog.component';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css', '../../posts.css']
})
export class ThreadDetailComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  constructor(private route: ActivatedRoute, private dialog: MatDialog,
              private boardService: BoardService) {
  }

  thread: ThreadDetail;
  showFile: boolean[] = [];

  previewTop: number;
  previewLeft: number;
  postPreview: Post;
  postData: PostCreate = new PostCreate();

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const thread_id = +params.get('thread_id');
        this.boardService.getThread(thread_id).subscribe(
          t => {
            this.thread = t;
          });
      });
  }


  createPostDialog(body: string): void {
    if (body) {
      this.postData.body = (this.postData.body || '') + body + '\n';
    }
    const dialogRef = this.dialog.open(CreatePostComponent, {
      // height: '80vh',
      width: '600px',
      data: {
        threadID: this.route.snapshot.paramMap.get('thread_id'),
        post: this.postData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postData = new PostCreate;
        this.updatePosts();
      }
    });

    dialogRef.componentInstance.postData.subscribe(p => {
      this.postData = p;
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

  updatePosts() {
    const last_id = this.thread.posts[this.thread.posts.length - 1].id;
    this.boardService.getPostsAfter(last_id).subscribe(
      p => {
        if (p) {
          this.thread.posts = this.thread.posts.concat(p);
        }
      });
  }
}
