import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganisateurService } from '../service/organisateur.service';
import { Organisateur } from '../model/organisateur';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organisateur',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./organisateur.component.css']
})
export class FormOrgComponent implements OnInit{

  constructor(private orgService : OrganisateurService,
      //Variable permettant la redirection
        private router : Router,
        //variable premettant de recuperer l'id dans l'url
        private route :ActivatedRoute
      ){}

  orgForm = new FormGroup({
    id : new FormControl(''),
    nom : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if(this.route.snapshot.params['id']){ 
      this.getById();
    }
  }
  p : any; 
  getById(){
      this.orgService.getById(this.route.snapshot.params['id']).subscribe(
        (data : Organisateur)=>{
          this.p = data;
          this.orgForm.get('id')?.setValue(this.p.id);
          this.orgForm.get('nom')?.setValue(this.p.nom);
          this.orgForm.get('description')?.setValue(this.p.description);
  
        },(error)=>{
          console.log(error)
  
        }
      )
    }
  ajouterModifierOrg(){
    if(this.orgForm.invalid){
      alert("formulaire invalide")
      return;
    }else{
      //AJOUT
      if(this.orgForm.value['id']==''){
        this.p = this.orgForm.value;
          this.p.id = this.p.nom.length+this.p.description.length+this.p.nom[0]+this.p.nom[1]+this.p.nom[2];
          this.orgService.Ajout(this.p).subscribe(
              ()=>{
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Evénement enregistré",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigateByUrl('/organisateur');
              },
              (error)=>{
                console.log("Error")
              }
          );  
      }
      //UPDATE
      else{
        this.p = this.orgForm.value;
            this.orgService.Modifier(this.p).subscribe(
              ()=>{
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Modification enregistrée",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigateByUrl('/organisateur');
        
              },
              (error)=>{
                console.log(error);
              }
            );
      }
    }
  }

}

