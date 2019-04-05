import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {PostsComponent} from '../posts/posts.component';
import {PostEditComponent} from '../post-edit/post-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full'},
  { path: 'posts', component: PostsComponent},
  { path: 'edit/:id', component: PostEditComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
