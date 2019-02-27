import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BoardService} from '../../board.service';
import {UtilsService} from '../../utils.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  // this is a hack to get html default value for FormGroup i18n
  @ViewChild('author') author: ElementRef;

  createPostForm: FormGroup;
  file: File;
  fileInvalidTypeError: boolean;
  fileInvalidSizeError: boolean;
  submitting: boolean;
  error: boolean;
  @Output() postData = new EventEmitter();


  constructor(private dialogRef: MatDialogRef<CreatePostComponent>,
              private fb: FormBuilder, private boardService: BoardService,
              private utilsService: UtilsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.createForm();
    this.file = this.data.post.file;
    this.dialogRef.beforeClosed().subscribe(() => this.postData.emit(
      {author: this.createPostForm.value.author, body: this.createPostForm.value.body, file: this.file}
    ));
  }

  createForm() {
    this.createPostForm = this.fb.group({
      author: [this.data.post.author || this.author.nativeElement.value, Validators.maxLength(20)],
      body: [this.data.post.body, [Validators.required, Validators.maxLength(3000)]],
    });
  }

  onFileSelected(event) {
    const f = event.target.files[0];
    this.file = null;
    if (!f) {
      return;
    }
    this.checkFile(f);
  }

  checkFile(f: File) {
    if (!this.utilsService.validFileType(f.name)) {
      this.fileInvalidTypeError = true;
    } else if (!this.utilsService.validFileSize(f.size)) {
      this.fileInvalidSizeError = true;
    } else {
      this.file = f;
      this.fileInvalidTypeError = false;
      this.fileInvalidSizeError = false;
    }
  }

  createPost() {
    this.error = false;
    this.submitting = true;
    const [author, tripcode] = this.utilsService.splitString(this.createPostForm.value.author, '#');
    const fd = new FormData();
    fd.append('body', this.createPostForm.value.body);
    // fd.append('thread_id', this.data.thread_id);
    fd.append('author', author);
    fd.append('tripcode', tripcode);
    fd.append('file', this.file);

    this.boardService.createPost(fd, this.data.threadID).subscribe(
      post => this.dialogRef.close(post), _ => {
        this.submitting = false;
        this.error = true;
      }
    );

  }
}
