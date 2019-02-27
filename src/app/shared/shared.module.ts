import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BypassSecurityPipe} from './bypass-security.pipe';
import {ReplyPreviewComponent} from './reply-preview/reply-preview.component';
import {MaterialModule} from '../material.module';
import {PostBodyComponent} from './post-body/post-body.component';
import {RepliesDialogComponent} from './replies-dialog/replies-dialog.component';
import { PostThumbnailComponent } from './post-thumbnail/post-thumbnail.component';
import { PostFileComponent } from './post-file/post-file.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

@NgModule({
  declarations: [BypassSecurityPipe, ReplyPreviewComponent, PostBodyComponent,
    RepliesDialogComponent, PostThumbnailComponent, PostFileComponent, PaginatorComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [BypassSecurityPipe, ReplyPreviewComponent, PostBodyComponent,
    RepliesDialogComponent, PostThumbnailComponent, PostFileComponent, PaginatorComponent
  ],
  entryComponents: [RepliesDialogComponent]
})
export class SharedModule {
}
