import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BoardComponent} from './board/board.component';
import {ThreadDetailComponent} from './thread-detail/thread-detail.component';
import {BoardToolbarComponent} from './board-toolbar/board-toolbar.component';

const routes: Routes = [
  {path: '', component: BoardToolbarComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: ':board/:page', component: BoardComponent},
      { path: ':board', redirectTo: ':board/1', pathMatch: 'full' },
      {path: ':board/threads/:thread_id', component: ThreadDetailComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageboardRoutingModule {
}
