import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoardService} from '../../board.service';
import {UtilsService} from '../../utils.service';


@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {
  // this is a hack to get html default value for FormGroup i18n
  @ViewChild('author') author: ElementRef;

  createThreadForm: FormGroup;
  file: File;
  fileNotExistsError: boolean;
  fileInvalidTypeError: boolean;
  fileInvalidSizeError: boolean;
  submitting: boolean;
  error: boolean;
  @Output() threadData = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<CreateThreadComponent>,
              private fb: FormBuilder, private boardService: BoardService,
              private utilsService: UtilsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.createForm();
    this.file = this.data.thread.file;
    this.dialogRef.beforeClosed().subscribe(() => this.threadData.emit(
      {
        subject: this.createThreadForm.value.subject,
        author: this.createThreadForm.value.author,
        body: this.createThreadForm.value.body,
        file: this.file
      }));
  }


  createForm() {
    this.createThreadForm = this.fb.group({
      subject: [this.data.thread.subject, [Validators.minLength(2), Validators.maxLength(100)]],
      author: [this.data.thread.author || this.author.nativeElement.value, Validators.maxLength(50)],
      body: [this.data.thread.body, [Validators.required, Validators.maxLength(3000)]],
    });
  }


  onFileSelected(event) {
    const f = event.target.files[0];
    this.file = null;
    if (!f) {
      return;
    } else if (!this.utilsService.validFileType(f.name)) {
      this.fileInvalidTypeError = true;
    } else if (!this.utilsService.validFileSize(f.size)) {
      this.fileInvalidSizeError = true;
    } else {
      this.file = f;
      this.fileNotExistsError = false;
      this.fileInvalidTypeError = false;
      this.fileInvalidSizeError = false;
    }

  }

  validate() {
    if (!this.file) {
      this.fileNotExistsError = true;
      return false;
    }
    return !this.fileInvalidTypeError && !this.fileInvalidSizeError;
  }

  createThread() {
    this.error = false;
    if (this.validate()) {
      this.submitting = true;
      const [author, tripcode] = this.utilsService.splitString(this.createThreadForm.value.author, '#');
      const fd = new FormData();
      // for (const key in this.createThreadForm.value) {
      //   fd.append(key, this.createThreadForm.value[key]);
      // }
      fd.append('subject', this.createThreadForm.value.subject);
      fd.append('body', this.createThreadForm.value.body);
      fd.append('author', author);
      fd.append('tripcode', tripcode);
      fd.append('file', this.file);

      this.boardService.createThread(fd, this.data.board).subscribe(
        t => this.dialogRef.close(t), _ => {
          this.submitting = false;
          this.error = true;
        });
    }
  }
}
