import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoggedUser, ManagementThreadItem, Report} from '../management-models';
import {ReportsDialogComponent} from '../reports-dialog/reports-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ManagementService} from '../management.service';
import {BanDialogComponent} from '../ban-dialog/ban-dialog.component';

@Component({
  selector: 'app-management-thread-list',
  templateUrl: './management-thread-list.component.html',
  styleUrls: ['./management-thread-list.component.css', '../../posts.css']
})
export class ManagementThreadListComponent implements OnInit {
  @Input() threads: ManagementThreadItem[];
  showFile: boolean[] = [];
  loggedUser: LoggedUser;

  constructor(private dialog: MatDialog, private managementService: ManagementService) {
    this.loggedUser = managementService.getLoggedUser();
  }

  ngOnInit() {
  }

  reportsDialog(id: number, reports: Report[]) {
    const dialogRef = this.dialog.open(ReportsDialogComponent, {
      width: '600px',
      data: {
        reports: reports,
      },
      autoFocus: false,
    });

    // If reports change in the dialog change them in this component
    dialogRef.componentInstance.reportsChange.subscribe(r => {
      for (const i in this.threads) {
        if (this.threads[i].id === id) {
          this.threads[i].reports = r;
          break;
        }
      }
    });
  }

  deleteDialog(thread: ManagementThreadItem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {item: thread.id, action: 'delete'},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.managementService.deleteThread(thread.id).subscribe(
        _ => this.removeThread(thread));
    });
  }

  removeThread(thread: ManagementThreadItem) {
    this.threads = this.threads.filter(t => t.id !== thread.id);
  }

  banDialog(id: number) {
    this.dialog.open(BanDialogComponent, {
      width: '600px',
      data: {post_id: id},
      autoFocus: false
    });
  }
}
