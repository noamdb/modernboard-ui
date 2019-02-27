import {Component, Input, OnInit} from '@angular/core';
import {ManagementPost, ManagementThreadItem} from '../management-models';

@Component({
  selector: 'app-management-post-header',
  templateUrl: './management-post-header.component.html',
  styleUrls: ['./management-post-header.component.css', '../../posts.css']
})
export class ManagementPostHeaderComponent implements OnInit {
  @Input() post: any; // ManagementPost | ManagementThreadItem;
  @Input() is_locked: boolean;
  @Input() is_sticky: boolean;

  constructor() { }

  ngOnInit() {
  }

}
