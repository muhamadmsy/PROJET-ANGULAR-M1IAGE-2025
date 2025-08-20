import { Component, OnInit } from '@angular/core';
import  Chart  from 'chart.js/auto';
import { EvenementService } from '../service/evenement.service';
import { Evenement } from '../model/evenement';
import { ParticipantService } from '../service/participant.service';
import { Participant } from '../model/participant';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit{
  constructor(private evtService : EvenementService,
    private partService : ParticipantService
  ){}
  ngOnInit(): void {
    this.actualisation();
    
  }
  public chart :any;
  evenements : Evenement [] =[]; 
  participants : Participant [] =[]; 
  nombreEvt =0;
  nombrePartEvt=0;
  nomEvt=''
  axeDesX =[''];
  nbrp:any;
  nmbrepart =[''];
  
  actualisation(){
    this.evtService.list().subscribe(
      (evt : Evenement[])=>{
      this.evenements  = evt;
      this.nombreEvt=evt.length;
      this.partService.list().subscribe(
      (part : Participant[])=>{
        this.participants  = part;
        for(let a=0; a<evt.length;a++){
          this.nomEvt = evt[a].nom;
          this.axeDesX.push(this.nomEvt);
        }
        for(let a=1; a<=part.length;a++){
          this.nbrp=a;
          this.nmbrepart.push(this.nbrp);        
        }
        this.nmbrepart.shift();
        console.log(this.nmbrepart)
        this.axeDesX.shift();
        this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart      
        data: {// values on X-Axis
          labels: this.axeDesX, 
          datasets: [
          {
            label: "Participants",
            data: this.nmbrepart,
            //['2','4', '6', '8', '10'],
              backgroundColor: 'purple'
            }  
              ]
          },
          options: {
          aspectRatio:2.5
          }
        });
      });
    });
  }
}
