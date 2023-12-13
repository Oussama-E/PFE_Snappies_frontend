import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './ADMIN/article/article.component';
import { TourneeComponent } from './ADMIN/tournee/tournee.component';
import { LoginFormComponent } from './LOGIN/login-form/login-form.component';
import { CommandsListComponent } from './ADMIN/commands-list/commands-list.component';
import { CreateCommandFormComponent } from './ADMIN/create-command-form/create-command-form/create-command-form.component';
import { LivreurPageComponent } from './LIVREUR/livreur-page/livreur-page.component';
import { CreateTourneePageComponent } from './ADMIN/create-tournee-page/create-tournee-page.component';
import { AllLivreursComponent } from './ADMIN/all-livreurs/all-livreurs.component';
import { CreateLivreurComponent } from './ADMIN/create-livreur/create-livreur.component';
import { ClientsComponent } from './ADMIN/clients/clients.component';
import { CreateClientPageComponent } from './ADMIN/create-client-page/create-client-page.component';

const routes: Routes = [ 
  { path: '', component: LoginFormComponent},
  { path: 'articles', component: ArticleComponent },
  { path: 'tournees', component: TourneeComponent },
  { path: 'commandes', component: CommandsListComponent },
  { path: 'nouvelleCommande', component: CreateCommandFormComponent },
  { path: 'livreur_page', component: LivreurPageComponent },
  { path: 'tournee/creation', component: CreateTourneePageComponent },
  { path: 'livreurs', component: AllLivreursComponent },
  { path: 'livreur/create', component: CreateLivreurComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'client/create', component: CreateClientPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
