import {Component, OnInit} from '@angular/core';
import {Board} from '../../models';
import {ManagementService} from '../management.service';
import {BoardUser, LoggedUser} from '../management-models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-board-users',
  templateUrl: './board-users.component.html',
  styleUrls: ['./board-users.component.css']
})
export class BoardUsersComponent implements OnInit {
  selectedBoard: string;
  boards: Board[];
  users: BoardUser[];
  loggedUser: LoggedUser;
  displayedColumns = ['name', 'role', 'created', 'remove'];
  addBoardUserForm: FormGroup;
  error: boolean;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder, private managementService: ManagementService) {
    this.loggedUser = managementService.getLoggedUser();
  }

  ngOnInit() {
    this.createForm();
    this.managementService.GetBoards().subscribe(
      boards => {
        this.boards = boards;
        this.selectedBoard = this.boards[0].uri;
        this.getUsers(this.boards[0].uri);
      });
  }

  getUsers(uri: string) {
    this.managementService.getBoardUsers(uri).subscribe(
      users => {
        this.users = users;
      });
  }

  createForm() {
    this.addBoardUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    });
  }

  addUser() {
    const name = this.addBoardUserForm.value.name;
    if (this.users.find(u => u.name === name)) {
      return;
    }
    this.managementService.createBoardUser(this.selectedBoard, name).subscribe(
      _ => {
        this.getUsers(this.selectedBoard);
        this.error = false;
      }, _ => this.error = true);
  }

  removeUser(name: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {item: name, action: 'delete'},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.managementService.deleteBoardUser(this.selectedBoard, id).subscribe(
        () => this.users = this.users.filter(u => u.id !== id)
      );
    });
  }

}
