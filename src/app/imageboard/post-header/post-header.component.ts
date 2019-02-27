import {Component, Input, OnInit} from '@angular/core';
import {ReportDialogComponent} from '../report-dialog/report-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css', '../../posts.css']
})
export class PostHeaderComponent implements OnInit {
  @Input() post: any; // Post | ThreadItem;
  @Input() is_locked: boolean;
  @Input() is_sticky: boolean;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  reportDialog(postID: string): void {
    this.dialog.open(ReportDialogComponent, {
      // height: '80vh',
      width: '600px',
      data: {
        postID: +postID,
      }
    });
  }
}
