import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/evenement';
import Swal from 'sweetalert2';
import { EvenementService } from '../service/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Organisateur } from '../model/organisateur';

@Component({
  selector: 'form-evenements',
  templateUrl: './Formulaire.component.html',
  styleUrls: ['./evenements.component.css']
})
export class FormulaireComponent implements OnInit {
  constructor(private evtService : EvenementService,
    //Variable permettant la redirection
    private router : Router,
    //variable premettant de recuperer l'id dans l'url
    private route :ActivatedRoute
   ){ }
  ngOnInit(): void {
    this.listeDesOrg();
    if(this.route.snapshot.params['id']){ 
      this.getById();
      this.listeDesOrg();

    }    
    
  }
  
  getById(){
    this.evtService.getById(this.route.snapshot.params['id']).subscribe(
      (data : Evenement)=>{
        this.e = data;
        this.evtForm.get('id')?.setValue(this.e.id);
        this.evtForm.get('nom')?.setValue(this.e.nom);
        this.evtForm.get('date')?.setValue(this.e.date);
        this.evtForm.get('lieu')?.setValue(this.e.lieu);
        this.evtForm.get('description')?.setValue(this.e.description);
        this.evtForm.get('organisateur')?.setValue(this.e.organisateur);

      },(error)=>{
        console.log(error)

      }
    )
  }
  evtForm = new FormGroup({
    id : new FormControl(''),
    nom : new FormControl('', [Validators.required]),
    date : new FormControl('', [Validators.required]),
    lieu : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    organisateur : new FormControl('', [Validators.required])
  });

  e : any;

  
  
ajouterModifierEvt(){
  if(this.evtForm.invalid){
    alert("formulaire invalide")
    return;
  }else{
    //AJOUT
    if(this.evtForm.value['id']==''){
      this.e = this.evtForm.value;
        this.e.id = this.e.nom.length+this.e.organisateur.length+this.e.nom[0]+this.e.organisateur[0];
        this.evtService.Ajout(this.e).subscribe(
            ()=>{
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Evénement enregistré",
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigateByUrl('/evenement');
            },
            (error)=>{
              console.log("Error")
            }
        );  
  }//UPDATE
  else{
    this.e = this.evtForm.value;
    this.evtService.Modifier(this.e).subscribe(
      ()=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Modification enregistrée",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/evenement');

      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
}
organisateurs : Organisateur [] =[];
listeDesOrg(){
  this.evtService.ListOrg().subscribe(
    (data : Organisateur[])=>{
      this.organisateurs  = data;
    },
    (error)=>{
      console.log(error);
    }
  )
}

 }
