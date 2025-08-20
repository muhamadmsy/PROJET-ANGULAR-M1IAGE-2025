import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/evenement';
import Swal from 'sweetalert2';
import { EvenementService } from '../service/evenement.service';
import { OrganisateurService } from '../service/organisateur.service';
import { Organisateur } from '../model/organisateur';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})
export class EvenementsComponent implements OnInit {
  constructor(private evtService : EvenementService,
    private orgService : OrganisateurService
   ){}
  ngOnInit(): void {
    this.actualisation();
  }  

  evenements : Evenement [] =[];  

  SupprimerEvenement(id:string) { 
    Swal.fire({
      title: "Etes-vous sûr de vouloir supprimer ?",
      showDenyButton: true,
      confirmButtonText: "OUI",
      denyButtonText: `NON`
    }).then((result) => {
      if (result.isConfirmed) {
          this.evtService.supprimerEvt(id).subscribe(
            ()=>{
              this.actualisation();

            },
            (error)=>{
              console.log(error)

            }
          )
      } 
    });
    
  }
  idorg ='';
  organisateurs = [''];
  p : any; 
  actualisation(){

    this.evtService.list().subscribe(
      (data : Evenement[])=>{
        this.evenements  = data;
        
        for(let a=0; a<data.length;a++){
        this.idorg = data[a].organisateur;
        //alert(this.idorg);
        this.orgService.getById(this.idorg).subscribe(
          (data : Organisateur)=>{

            this.p = data;
            
            this.organisateurs.push(this.p.nom); 
           // alert(this.organisateurs);

    
          },(error)=>{
            console.log(error)
    
          })

        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
