import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageboardRoutingModule} from './imageboard-routing.module';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from '../material.module';
import {BoardComponent} from './board/board.component';
import {ThreadListComponent} from './thread-list/thread-list.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {CreateThreadComponent} from './create-thread/create-thread.component';
import {ThreadDetailComponent} from './thread-detail/thread-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BoardToolbarComponent} from './board-toolbar/board-toolbar.component';
import {SharedModule} from '../shared/shared.module';
import {ReportDialogComponent} from './report-dialog/report-dialog.component';
import {PostHeaderComponent} from './post-header/post-header.component';

@NgModule({
  declarations: [HomeComponent, BoardComponent, ThreadListComponent,
    CreatePostComponent, CreateThreadComponent, ThreadDetailComponent, BoardToolbarComponent, ReportDialogComponent, PostHeaderComponent
  ],
  imports: [
    CommonModule,
    ImageboardRoutingModule,

    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule

  ],
  entryComponents: [CreateThreadComponent, CreatePostComponent, ReportDialogComponent]
})
export class ImageboardModule { }
