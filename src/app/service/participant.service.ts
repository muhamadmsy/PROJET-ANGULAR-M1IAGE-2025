import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from '../model/evenement';
import { Observable } from 'rxjs';
import { Participant } from '../model/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  urlevt ='http://localhost:8000/evenements';
  urlpart ='http://localhost:8000/participants';

   constructor(private httpClient : HttpClient) { }

   ListEvt(): Observable<Evenement[]>{
       return this.httpClient.get<Evenement[]>(this.urlevt);
   }
   getById(id:string){
    return this.httpClient.get<Participant>(this.urlpart+"/"+id);
  }
   Ajout(part : Participant){
    return this.httpClient.post(this.urlpart,part);
  }
  list() : Observable<Participant[]>{
    return this.httpClient.get<Participant[]>(this.urlpart);
  }
  getByIdEvt(id:string){
    return this.httpClient.get<Evenement>(this.urlevt+"/"+id);
  }
  supprimerPart(id:string){
    return this.httpClient.delete(this.urlpart+'/'+id);

  }
  Modifier(part:Participant){
    return this.httpClient.put(this.urlpart+'/'+part.id, part);
    }
}
