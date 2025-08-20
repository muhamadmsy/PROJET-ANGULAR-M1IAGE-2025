import { Injectable } from '@angular/core';
import { Evenement } from '../model/evenement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisateur } from '../model/organisateur';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
 // evenements : Evenement [] =[];
  url ='http://localhost:8000/evenements';
  urlorg ='http://localhost:8000/organisateurs';

  constructor(private httpClient : HttpClient) { }

  supprimerEvt(id:string){
    return this.httpClient.delete(this.url+'/'+id);

  }
  Ajout(evt : Evenement){
    return this.httpClient.post(this.url,evt);
  }
  Modifier(evt:Evenement){
  return this.httpClient.put(this.url+'/'+evt.id, evt);
  }
  list() : Observable<Evenement[]>{
    return this.httpClient.get<Evenement[]>(this.url);
  }
  getById(id:string){
    return this.httpClient.get<Evenement>(this.url+"/"+id);
  }
  getByIdOrg(id:string){
    return this.httpClient.get<Evenement>(this.urlorg+"/"+id);
  }
  ListOrg(): Observable<Organisateur[]>{
    return this.httpClient.get<Organisateur[]>(this.urlorg);
}

}
