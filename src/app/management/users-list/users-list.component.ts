import {Component, OnInit} from '@angular/core';
import {LoggedUser, UserItem} from '../management-models';
import {ManagementService} from '../management.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: UserItem[];
  loggedUser: LoggedUser;
  displayedColumns = ['name', 'role', 'created', 'delete'];


  constructor(private dialog: MatDialog, private managementService: ManagementService) {
    this.loggedUser = managementService.getLoggedUser();
  }

  ngOnInit() {
    this.managementService.getUsers().subscribe(
      users => {
        this.users = users;
      });
  }

  deleteUser(name: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {item: name, action: 'delete'},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.managementService.deleteUser(id).subscribe(
        () => this.users = this.users.filter(u => u.id !== id)
      );
    });
  }

}
