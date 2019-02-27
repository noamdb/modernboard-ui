import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.css']
})
export class PostThumbnailComponent implements OnInit {
  @Input() thumbnail: string;
  @Input() file: string;
  thumbnailsPath = environment.thumbnailsUrl;
  isPlayable: boolean;

  constructor() {}

  ngOnInit() {
    this.isPlayable = ['gif', 'webm'].indexOf(this.file.split('.').pop()) !== -1;
  }

}
