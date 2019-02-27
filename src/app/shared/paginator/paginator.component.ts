import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() currentPage: number;
  @Input() disableNext: boolean;
  @Output() change = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  setPage(offset: number) {
    this.change.emit(this.currentPage + offset);
  }

}
