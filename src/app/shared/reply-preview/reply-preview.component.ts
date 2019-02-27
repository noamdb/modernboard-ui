import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UtilsService} from '../../utils.service';


@Component({
  selector: 'app-reply-preview',
  templateUrl: './reply-preview.component.html',
  styleUrls: ['./reply-preview.component.css', '../../posts.css']
})
export class ReplyPreviewComponent implements OnInit {
  @Input() top: number;
  @Input() left: number;
  @Input() post: any;
  hidden: boolean;
  finalTop: number;
  finalLeft: number;


  constructor(private el: ElementRef, private utilsService: UtilsService) {
  }

  ngOnInit() {

  }

  // can't get height of element with "position: absolute" so we take the first child's height
  @ViewChild('preview') set preview(el: ElementRef) {
    if (!el) {
      return;
    }
    this.el.nativeElement.children[0].style.visibility = 'hidden';

    setTimeout(() => {
      const card = this.el.nativeElement.children[0];
      if (!card) {
        return;
      }

      this.finalLeft = this.utilsService.isLtr() ? this.left : this.left - card.offsetWidth;
      this.finalTop = this.top - card.offsetHeight / 2;
      const pageBottom = document.documentElement.clientHeight + window.scrollY;
      const pageTop = window.scrollY;
      if (this.finalTop + card.offsetHeight > pageBottom) {
        this.finalTop = pageBottom - card.offsetHeight - 8;
      } else if (this.finalTop < pageTop) {
        this.finalTop = pageTop + 8;
      }
      card.style.visibility = 'visible';

    });
  }
}
