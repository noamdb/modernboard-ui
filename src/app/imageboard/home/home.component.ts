import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../board.service';
import {Board, TrendingThread} from '../../models';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  thumbnailsPath = environment.thumbnailsUrl;

  boards: Board[];
  threads: TrendingThread[];

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardService.getBoards().subscribe(
      boards => this.boards = boards
    );
    this.boardService.getTrending().subscribe(
      threads => this.threads = threads
    );
  }

}
