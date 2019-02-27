import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManagementService} from '../management.service';
import {ManagementThreadItem} from '../management-models';

@Component({
  selector: 'app-management-board',
  templateUrl: './management-board.component.html',
  styleUrls: ['./management-board.component.css']
})
export class ManagementBoardComponent implements OnInit {
  threads: ManagementThreadItem[];
  page: number;
  constructor(private route: ActivatedRoute, private router: Router, private managementService: ManagementService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const board = params.get('board');
        this.page = +params.get('page');
        this.getThreads(board);
      });
  }

  getThreads(board: string) {
    this.managementService.getThreads(board, this.page).subscribe(
      threads => {
        if (!threads && this.page !== 1) {
          this.setPage(1);
          return;
        }
        this.threads = threads;
        window.scroll(0, 0);
      });
  }

  setPage(page: number) {
    this.router.navigate(['../' + page], {relativeTo: this.route});
  }
}
