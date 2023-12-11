import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCommandFormComponent } from './create-command-form/create-command-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CommandsListComponent } from './commands-list/commands-list.component';
import { TourneeComponent } from './tournee/tournee.component';

const routes: Routes = [{path:"createCommand", component: CreateCommandFormComponent},
{path:"", component: LoginFormComponent},
{path:"commandsList", component: CommandsListComponent},
{path:"tournee", component: TourneeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
