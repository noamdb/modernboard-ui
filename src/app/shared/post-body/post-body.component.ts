import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Directionality} from '@angular/cdk/bidi';
import {UtilsService} from '../../utils.service';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.css', '../../posts.css'],
})
export class PostBodyComponent implements OnInit {

  @Input() body: string;
  @Input() timeout: number;
  @Output() replyOver = new EventEmitter();
  @Output() replyOut = new EventEmitter();
  @Output() replyClick = new EventEmitter();

  constructor(private utilsService: UtilsService) {
  }

  ngOnInit() {
  }

  overReply(event: any) {
    const target = event.target as HTMLElement;
    const id = +target.id;
    // element with no id returns empty string which returns 0
    if (id === 0 || !Number.isInteger(id)) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const top = rect.bottom + window.scrollY - rect.height / 2;
    const left = this.utilsService.isLtr() ? rect.right + 10 : rect.left - 10;
    this.replyOver.emit({'id': id, 'top': top, 'left': left});
  }

  clickReply(event: any) {
    const id = +event.target.id;
    if (id === 0 || !Number.isInteger(id)) {
      return;
    }
    this.replyClick.emit();
    // In some places, for example dialog, we need time to close the dialog
    setTimeout(function () {
      document.getElementById(`post-${event.target.id}`).scrollIntoView({behavior: 'smooth', block: 'start'});
    }, this.timeout);
  }


  outReply(event: any) {
    const id = +event.target.id;
    if (id === 0 || !Number.isInteger(id)) {
      return;
    }
    this.replyOut.emit();
  }
}
