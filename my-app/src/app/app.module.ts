import { AppComponent } from './app.component';
import { LoginFormComponent } from './LOGIN/login-form/login-form.component';
import { ArticleComponent } from './ADMIN/article/article.component';
import { TourneeComponent } from './ADMIN/tournee/tournee.component';
import { CommandsListComponent } from './ADMIN/commands-list/commands-list.component';
import { CreateCommandFormComponent } from './ADMIN/create-command-form/create-command-form/create-command-form.component';


import { ToastrModule } from 'ngx-toastr';
import { NgModule, isDevMode } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LivreurPageComponent } from './LIVREUR/livreur-page/livreur-page.component';
import { CreateTourneePageComponent } from './ADMIN/create-tournee-page/create-tournee-page.component';
import { CommonModule } from '@angular/common';
import { AllLivreursComponent } from './ADMIN/all-livreurs/all-livreurs.component';
import { CreateLivreurComponent } from './ADMIN/create-livreur/create-livreur.component';
import { ClientsComponent } from './ADMIN/clients/clients.component';
import { CreateClientPageComponent } from './ADMIN/create-client-page/create-client-page.component';





@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    TourneeComponent,
    LoginFormComponent,
    CommandsListComponent,
    CreateCommandFormComponent,
    LivreurPageComponent,
    CreateTourneePageComponent,
    AllLivreursComponent,
    CreateLivreurComponent,
    ClientsComponent,
    CreateClientPageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatGridListModule, 
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
