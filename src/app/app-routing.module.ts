import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/errors/not-found/not-found.component';


const routes: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: 'home', component: HomeComponent},
  {path: '404', component: NotFoundComponent},

  {path: 'management', loadChildren: './management/management.module#ManagementModule'},

  {path: '', loadChildren: './imageboard/imageboard.module#ImageboardModule'},
  {path: '**', redirectTo: '/404'}

  // {path: 'signup', component: SignupComponent},
  // {path: 'signin', component: SigninComponent},
  // {path: 'profile/:username', component: ProfileComponent,
  //   children: [
  //     { path: '', redirectTo: 'posts', pathMatch: 'full' },
  //     { path: 'posts', component: ProfilePostsComponent },
  //     { path: 'following', component: FollowingComponent },
  //     { path: 'followers', component: FollowersComponent },
  //     { path: 'likes', component: LikesComponent },
  //   ]},
  // {path: 'discover', component: DiscoverComponent},
  // {path: '**', component: HomeComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
