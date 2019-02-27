import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateThreadComponent} from '../create-thread/create-thread.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadCreate, ThreadItem} from '../../models';
import {BoardService} from '../../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  threads: ThreadItem[];
  page: number;
  threadData: ThreadCreate = new ThreadCreate();


  constructor(private route: ActivatedRoute, private router: Router,
              private dialog: MatDialog, private boardService: BoardService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const board = params.get('board');
        this.page = +params.get('page');
        this.getThreads(board);
      });
  }

  createThreadDialog(): void {
    const dialogRef = this.dialog.open(CreateThreadComponent, {
      // height: '80vh',
      width: '600px',
      data: {board: this.route.snapshot.paramMap.get('board'), thread: this.threadData}
    });

    dialogRef.afterClosed().subscribe(t => {
      if (t) {
        this.router.navigate(['../threads/', t.id], {relativeTo: this.route, queryParams: {}});
      }
    });
    dialogRef.componentInstance.threadData.subscribe(t => {
      this.threadData = t;
    });
  }

  getThreads(board: string) {
    this.boardService.getThreads(board, this.page).subscribe(
      threads => {
        if (!threads && this.page !== 1) {
          this.setPage(1);
          return;
        }
        this.threads = threads;
        window.scroll(0, 0);
      }
    );
  }

  setPage(page: number) {
    this.router.navigate(['../' + page], {relativeTo: this.route});
  }
}

