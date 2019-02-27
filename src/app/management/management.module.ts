import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementRoutingModule} from './management-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {ManagementToolbarComponent} from './management-toolbar/management-toolbar.component';
import {AddUserComponent} from './add-user/add-user.component';
import {ManageBoardsComponent} from './manage-boards/manage-boards.component';
import {ReportsComponent} from './reports/reports.component';
import {ManagementThreadListComponent} from './management-thread-list/management-thread-list.component';
import {SharedModule} from '../shared/shared.module';
import {ManagementBoardComponent} from './management-board/management-board.component';
import {ManagementPostHeaderComponent} from './management-post-header/management-post-header.component';
import {ReportsDialogComponent} from './reports-dialog/reports-dialog.component';
import { ManagementThreadDetailComponent } from './management-thread-detail/management-thread-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { BanDialogComponent } from './ban-dialog/ban-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BoardUsersComponent } from './board-users/board-users.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [LoginComponent, ManagementToolbarComponent, AddUserComponent,
    ManageBoardsComponent, ReportsComponent, ManagementThreadListComponent,
    ManagementBoardComponent, ManagementPostHeaderComponent, ReportsDialogComponent,
    ManagementThreadDetailComponent, ConfirmDialogComponent, BanDialogComponent, ChangePasswordComponent, BoardUsersComponent, UsersListComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,

    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [ReportsDialogComponent, ConfirmDialogComponent, BanDialogComponent]
})
export class ManagementModule {
}
