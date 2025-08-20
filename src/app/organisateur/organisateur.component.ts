import { Component, OnInit } from '@angular/core';
import { Organisateur } from '../model/organisateur';
import { OrganisateurService } from '../service/organisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrls: ['./organisateur.component.css']
})
export class OrganisateurComponent implements OnInit{

  constructor(private orgService : OrganisateurService){}

ngOnInit(): void {
  this.actualisation();
  
}
organisateurs : Organisateur [] =[];

actualisation(){
  this.orgService.list().subscribe(
    (data : Organisateur[])=>{
      this.organisateurs  = data;
      
    },
    (error)=>{
      console.log(error);
    }
  )
}
SupprimerOrganisateur(id:string) { 
    Swal.fire({
      title: "Etes-vous sûr de vouloir supprimer ?",
      showDenyButton: true,
      confirmButtonText: "OUI",
      denyButtonText: `NON`
    }).then((result) => {
      if (result.isConfirmed) {
          this.orgService.supprimerOrg(id).subscribe(
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

}
