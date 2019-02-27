import {Component, Input, OnInit} from '@angular/core';
import {ThreadItem} from '../../models';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css', '../../posts.css']
})
export class ThreadListComponent implements OnInit {
  @Input() threads: ThreadItem[];
  showFile: boolean[] = [];

  constructor() {
  }

  ngOnInit() {
  }


}
