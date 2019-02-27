import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ManagementService} from '../management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ban-dialog',
  templateUrl: './ban-dialog.component.html',
  styleUrls: ['./ban-dialog.component.css']
})
export class BanDialogComponent implements OnInit {
  post_id: number;
  reason: string;
  banForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<BanDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
              private managementService: ManagementService) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.banForm = this.fb.group({
      reason: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ban() {
    this.managementService.banPoster(this.data.post_id, this.banForm.value.reason).subscribe(
      null, null, () => this.dialogRef.close()
    );
  }
}
