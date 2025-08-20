import { Component, OnInit } from '@angular/core';
import { Participant } from '../model/participant';
import Swal from 'sweetalert2';
import { ParticipantService } from '../service/participant.service';
import { Evenement } from '../model/evenement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'form-participant',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./participant.component.css']
})
export class FormPartComponent implements OnInit{
  constructor(private partService : ParticipantService,
    //Variable permettant la redirection
      private router : Router,
      //variable premettant de recuperer l'id dans l'url
      private route :ActivatedRoute
    ){}
  ngOnInit(): void {
      this.listeDesEvt();
      if(this.route.snapshot.params['id']){ 
        this.getById();
        this.listeDesEvt();
      }
    
  }

  getById(){
    this.partService.getById(this.route.snapshot.params['id']).subscribe(
      (data : Participant)=>{
        this.p = data;
        this.partForm.get('id')?.setValue(this.p.id);
        this.partForm.get('prenom')?.setValue(this.p.prenom);
        this.partForm.get('nom')?.setValue(this.p.nom);
        this.partForm.get('evenement')?.setValue(this.p.evenement);

      },(error)=>{
        console.log(error)

      }
    )
  }
  
  participants : Participant [] =[];

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
    evenements : Evenement [] =[];
    partForm = new FormGroup({
        id : new FormControl(''),
        prenom : new FormControl('', [Validators.required]),
        nom : new FormControl('', [Validators.required]),
        evenement : new FormControl('', [Validators.required])
      });
  p : any;      

  ajouterModifierPart(){
     if(this.partForm.invalid){
        alert("formulaire invalide")
        return;
      }else{
        //AJOUT
        if(this.partForm.value['id']==''){
          this.p = this.partForm.value;
            this.p.id = this.p.prenom.length+this.p.nom.length+this.p.evenement.length+this.p.prenom[0]+this.p.nom[0];
            this.partService.Ajout(this.p).subscribe(
                ()=>{
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Evénement enregistré",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigateByUrl('/participant');
                },
                (error)=>{
                  console.log("Error")
                }
            );  
        }
        //UPDATE
        else{
          this.p = this.partForm.value;
              this.partService.Modifier(this.p).subscribe(
                ()=>{
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Modification enregistrée",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigateByUrl('/participant');
          
                },
                (error)=>{
                  console.log(error);
                }
              );
        }
      }
    }
    

/*
  effacerFormulaire(){
    this.part ={
      'id':0,
      'prenom':'',
      'nom':'',
      'evenement':''
    }
  }
  recharge(p:Participant){
    this.part = p; 
  }
  SupprimerParticipant(id:number) { 
    Swal.fire({
      title: "Etes-vous sûr de vouloir supprimer ?",
      showDenyButton: true,
      confirmButtonText: "OUI",
      denyButtonText: `NON`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below 
      if (result.isConfirmed) {
          this.participants = this.participants.filter((a)=>a.id!=id);
          this.effacerFormulaire();
      } 
    });
    
  }*/

}
