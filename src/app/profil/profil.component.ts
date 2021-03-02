import { Component, OnInit } from '@angular/core';
import {ProfilService} from './service/profil.service';
import {Profil} from '../_models/profil';
import {first} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [MessageService],
})
export class ProfilComponent implements OnInit {
  profils: Profil[];
  profilForm: FormGroup;
  msgs1: any;
  msgs2: any;
  tabUser = false;
  profil: any;
  users = [];
  userAfficher = [];
  cols: any[];
  profilLibelle: string;
  constructor(private profilServive: ProfilService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.profilServive.getAllProfils().pipe(first()).subscribe(
      profils => {
        this.profils = profils['hydra:member'];
        console.log(this.profils);
      }
    );

    this.profilForm = new FormGroup(
      {
        libelle: new FormControl( null, [Validators.required]),
    }
    );
  }
  onSubmit() {
    if (this.profilForm.valid) {
      this.profilServive.createProfil(JSON.stringify(this.profilForm.value)).pipe(first()).subscribe(
        profil => {
         // location.reload();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Profil cree'});
        //  location.reload();
        });
    }
  }
  editProfil(profil) {
    this.profilServive.updateProfil(profil.id, JSON.stringify(profil)).pipe(first()).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
     profil => {
       this.messageService.add({severity: 'success', summary: 'Success', detail: 'Profil is updated'});
       console.log('success');
    });
  }
  archiveProfil(profil) {
   this.profilServive.delete(profil.id, JSON.stringify(profil)).pipe(first()).subscribe(
     // tslint:disable-next-line:no-shadowed-variable
     profil => {
       this.messageService.add({severity: 'error', summary: 'Error', detail: 'Profil archiver'});
     }
   );
  }
  detailProfilUsers(id, libelle) {
   this.profilLibelle  = libelle;
    this.profil = [];
    this.userAfficher = [];
    this.tabUser = true;
    this.profilServive.getProfilById(id).pipe(first()).subscribe(
      pro => {
        this.users = pro['users'];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.users.length ; i++) {
          if (this.users[i].isdeleted === false) {
            this.userAfficher.push(this.users[i]);
          }
        }
        this.profil = this.userAfficher;
        console.log(this.profil);
      });
  }
}
