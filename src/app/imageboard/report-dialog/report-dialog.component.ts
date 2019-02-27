import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoardService} from '../../board.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ReportCreate} from '../../models';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {
  reportForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ReportDialogComponent>,
              private fb: FormBuilder, private boardService: BoardService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.reportForm = this.fb.group({
      reason: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }


  report() {
    const report: ReportCreate = {reason: this.reportForm.value.reason};
    this.boardService.reportPost(report, this.data.postID).pipe(
      finalize(() => this.dialogRef.close())
    ).subscribe();
  }
}
