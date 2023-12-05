import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCommandFormComponent } from './create-command-form/create-command-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [{path:"createCommand", component: CreateCommandFormComponent},
{path:"", component: LoginFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
