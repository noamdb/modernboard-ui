import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ManagementToolbarComponent} from './management-toolbar/management-toolbar.component';
import {AddUserComponent} from './add-user/add-user.component';
import {ManageBoardsComponent} from './manage-boards/manage-boards.component';
import {ManagementBoardComponent} from './management-board/management-board.component';
import {ManagementThreadDetailComponent} from './management-thread-detail/management-thread-detail.component';
import {ReportsComponent} from './reports/reports.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {BoardUsersComponent} from './board-users/board-users.component';
import {UsersListComponent} from './users-list/users-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: ManagementToolbarComponent,
    children: [
      {path: '', redirectTo: 'boards', pathMatch: 'full'},
      {path: 'boards', component: ManageBoardsComponent},
      {path: 'users/add', component: AddUserComponent},
      {path: 'users', component: UsersListComponent},
      {path: 'users/boards', component: BoardUsersComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      {path: 'reports/:page', component: ReportsComponent},
      {path: 'reports', redirectTo: 'reports/1', pathMatch: 'full'},
      {path: ':board/threads/:thread_id', component: ManagementThreadDetailComponent},
      {path: ':board/:page', component: ManagementBoardComponent},
      {path: ':board', redirectTo: ':board/1', pathMatch: 'full'},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
