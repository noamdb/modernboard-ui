import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../board.service';
import {Board} from '../../models';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css']
})
export class BoardToolbarComponent implements OnInit {
  selected: string;
  boards: Board[];
  boardURI: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardURI = this.route.firstChild.snapshot.paramMap.get('board');

    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.boardURI = this.route.firstChild.snapshot.paramMap.get('board');
          this.setSelection();
        }
      }
    );

    this.boardService.getBoards().subscribe(
      boards => {
        this.boards = boards;
        this.setSelection();
      }
    );
  }

  setSelection() {
    if (!this.boardURI) {
      this.selected = undefined;
    } else if (this.boards) {
      const board = this.boards.find(b => {
        return b.uri === this.boardURI;
      });
      this.selected = board ? board.uri : undefined;
    }
  }

  navigateTo(value) {
    this.router.navigate([`/${value}`]);
  }

}
