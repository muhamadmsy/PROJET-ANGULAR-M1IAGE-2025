import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenementsComponent } from './evenements/evenements.component';
import { ParticipantComponent } from './participant/participant.component';
import { FormulaireComponent } from './evenements/formulaire.component';
import { FormPartComponent } from './participant/formulaire.component';
import { OrganisateurComponent } from './organisateur/organisateur.component';
import { FormOrgComponent } from './organisateur/formulaire.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  {path: 'evenement', component : EvenementsComponent},
  {path: 'form-evt', component : FormulaireComponent},
  {path: 'form-update-evt/:id', component : FormulaireComponent},
  {path: 'participant', component : ParticipantComponent},
  {path: 'form-part', component : FormPartComponent},
  {path: 'form-update-part/:id', component : FormPartComponent},
  {path: 'organisateur', component : OrganisateurComponent},
  {path: 'form-org', component : FormOrgComponent},
  {path: 'form-update-org/:id', component : FormOrgComponent},
  {path: 'statistiques', component : StatistiquesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
