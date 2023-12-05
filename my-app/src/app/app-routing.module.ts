import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourneeComponent } from './ADMIN/tournee/tournee.component';
import { LoginComponent } from './LOGIN/login/login.component';

const routes: Routes = [
  { path: 'tournee', component: TourneeComponent },
  { path: '', component: LoginComponent },  // Redirection vers '/login' pour le chemin vide
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
