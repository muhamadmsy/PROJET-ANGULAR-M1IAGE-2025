import { Component, OnInit } from '@angular/core';
import { Participant } from '../model/participant';
import Swal from 'sweetalert2';
import { ParticipantService } from '../service/participant.service';
import { Evenement } from '../model/evenement';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit{
  constructor(private partService : ParticipantService){}
  ngOnInit(): void {
    this.actualisation();
    this.listeDesEvt();    
  }
  

  listeDesEvt(){
    this.partService.ListEvt().subscribe(
      (data : Evenement[])=>{
        this.evenements  = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  participants : Participant [] =[];
  evenements : Evenement [] = [];

SupprimerParticipant(id:string) { 
    Swal.fire({
      title: "Etes-vous sûr de vouloir supprimer ?",
      showDenyButton: true,
      confirmButtonText: "OUI",
      denyButtonText: `NON`
    }).then((result) => {
      if (result.isConfirmed) {
          this.partService.supprimerPart(id).subscribe(
            ()=>{
              this.actualisation();

            },
            (error)=>{
              console.log(error)

            }
          )
         // this.evenements = this.evtService.list();
          //this.effacerFormulaire();
      } 
    });
    
  }
  
  actualisation(){
      this.partService.list().subscribe(
        (data : Participant[])=>{
          this.participants  = data;
          
        },
        (error)=>{
          console.log(error);
        }
      )
    }

}
