import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  
  urlevt ='http://localhost:8000/evenements';
  urlpart ='http://localhost:8000/participants';

  constructor(private httpClient : HttpClient) { }

  
}
