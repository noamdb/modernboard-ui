import {Component, Inject, Input, OnInit} from '@angular/core';
import {Post} from '../../models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-replies-dialog',
  templateUrl: './replies-dialog.component.html',
  styleUrls: ['./replies-dialog.component.css', '../../posts.css']
})
export class RepliesDialogComponent implements OnInit {
  posts: any;
  replyPosts: any;
  previewTop: number;
  previewLeft: number;
  postPreview: Post;

  constructor(private dialogRef: MatDialogRef<RepliesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.posts = this.data.posts;
    this.replyPosts = this.posts.filter(p => this.data.replies.indexOf(p.id) !== -1);
  }

  findPostPreview(event) {
    this.previewTop = event.top;
    this.previewLeft = event.left;
    this.postPreview = this.posts.find(p => {
      return p.id === event.id;
    });
  }

  removePreview() {
    this.postPreview = undefined;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
