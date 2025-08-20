import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EvenementsComponent } from './evenements/evenements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticipantComponent } from './participant/participant.component';
import { HttpClientModule } from '@angular/common/http';
import { FormulaireComponent } from './evenements/formulaire.component';
import { FormPartComponent } from './participant/formulaire.component';
import { OrganisateurComponent } from './organisateur/organisateur.component';
import { FormOrgComponent } from './organisateur/formulaire.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';


@NgModule({
  declarations: [
    AppComponent,
    EvenementsComponent,
    ParticipantComponent,
    FormulaireComponent,
    FormPartComponent,
    OrganisateurComponent,
    FormOrgComponent,
    StatistiquesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
