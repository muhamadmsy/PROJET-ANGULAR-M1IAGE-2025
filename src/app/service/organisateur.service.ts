import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organisateur } from '../model/organisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisateurService {
  url ='http://localhost:8000/organisateurs';

  constructor(private httpClient : HttpClient) { }

  Ajout(org : Organisateur){
      return this.httpClient.post(this.url,org);
    }
  getById(id:string){
      return this.httpClient.get<Organisateur>(this.url+"/"+id);
    }
  list() : Observable<Organisateur[]>{
      return this.httpClient.get<Organisateur[]>(this.url);
    }
    supprimerOrg(id:string){
      return this.httpClient.delete(this.url+'/'+id);
  
    }
    Modifier(org:Organisateur){
      return this.httpClient.put(this.url+'/'+org.id, org);
      }

}
