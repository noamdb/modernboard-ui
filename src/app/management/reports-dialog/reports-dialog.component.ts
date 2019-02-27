import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Report} from '../management-models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UtilsService} from '../../utils.service';
import {ManagementService} from '../management.service';

@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  styleUrls: ['./reports-dialog.component.css']
})
export class ReportsDialogComponent implements OnInit {
  reports: Report[];
  @Output() reportsChange = new EventEmitter();


  constructor(private dialogRef: MatDialogRef<ReportsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private managementService: ManagementService,
              private utilsService: UtilsService) {
  }

  ngOnInit() {
    this.reports = this.data.reports;
    this.reports.forEach(r => {
      r.author_id_color = this.utilsService.stringToColor(r.author_id);
      r.created = this.utilsService.formatDate(r.created);
    });
  }

  dismissPost(id: number) {
    this.managementService.dismissReport(id).subscribe(
      _ => {
        if (this.reports.length === 1) {
          this.dialogRef.close();
        }
        this.reports = this.reports.filter(r => r.id !== id);
        this.reportsChange.emit(this.reports);
      });
  }
}
