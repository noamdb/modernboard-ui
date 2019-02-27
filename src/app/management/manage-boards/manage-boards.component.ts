import {Component, OnInit} from '@angular/core';
import {Board} from '../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoardCreate, LoggedUser} from '../management-models';
import {ManagementService} from '../management.service';

@Component({
  selector: 'app-manage-boards',
  templateUrl: './manage-boards.component.html',
  styleUrls: ['./manage-boards.component.css']
})
export class ManageBoardsComponent implements OnInit {
  createBoardForm: FormGroup;
  boards: Board[];
  loggedUser: LoggedUser;

  constructor(private fb: FormBuilder,
              private managementService: ManagementService) {
    this.createForm();
    this.loggedUser = managementService.getLoggedUser();
  }

  ngOnInit() {
    this.managementService.GetBoards().subscribe(
      boards => this.boards = boards || []
    );
  }

  createForm() {
    this.createBoardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      uri: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      priority: ['10', [Validators.required, Validators.min(1), Validators.max(2000)]],
    });
  }

  createBoard() {
    const board: BoardCreate = {
      title: this.createBoardForm.value.title,
      uri: this.createBoardForm.value.uri,
      priority: +this.createBoardForm.value.priority,
    };
    this.managementService.createBoard(board).subscribe(
      _ => {
        this.boards.push({id: 0, title: board.title, uri: board.uri});
      },
      error => {
        console.log(error);
      }
    );
  }
}
