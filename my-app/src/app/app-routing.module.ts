import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './ADMIN/article/article.component';
import { TourneeComponent } from './ADMIN/tournee/tournee.component';
import { LoginComponent } from './LOGIN/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  
  { path: 'articles', component: ArticleComponent },
  { path: 'tournee', component: TourneeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
