import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-post-file',
  templateUrl: './post-file.component.html',
  styleUrls: ['./post-file.component.css', '../../posts.css'],
})
export class PostFileComponent implements OnInit {
  @Input() file: string;
  filesUrl = environment.filesUrl;
  isVideo: boolean;

  constructor() {}

  ngOnInit() {
    this.isVideo = this.file.split('.').pop() === 'webm';
  }

}
