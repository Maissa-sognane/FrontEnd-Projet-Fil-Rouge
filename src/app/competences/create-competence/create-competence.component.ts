import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../_services/competences.service';
import {first} from 'rxjs/operators';
import {Groupecompetence} from '../../_models/groupecompetence';
import {FormControl, FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';

export interface Niveau {
  groupeAction: string;
  critereEvaluation: string;
  libelle: string;
}

@Component({
  selector: 'app-create-competence',
  templateUrl: './create-competence.component.html',
  styleUrls: ['./create-competence.component.scss']
})
export class CreateCompetenceComponent implements OnInit {

  grpecompetences: any;
  selectedGroupe: Groupecompetence;
  formCompetenece: FormGroup;
  constructor(private competenceService: CompetencesService,
              private message: MessageService) { }
 async ngOnInit(): Promise<void> {
    this.competenceService.getCompetencesAll().pipe(first()).subscribe(
      groupeCompetence => {
        this.grpecompetences = groupeCompetence['hydra:member'];
        console.log(this.grpecompetences);
      });
    this.formCompetenece = new FormGroup(
      {
        libelle: new FormControl(),
        descriptif: new FormControl(),
        critereEvaluation1: new FormControl(),
        groupeAction1: new FormControl(),
        critereEvaluation2: new FormControl(),
        groupeAction2: new FormControl(),
        critereEvaluation3: new FormControl(),
        groupeAction3: new FormControl(),
      });
  }
  onSubmit() {
    // tslint:disable-next-line:variable-name
    const niveaux = new Array(3);
    for (let i = 0; i < 3; i++) {
      if (i === 0 ) {
        niveaux[i] = {
          libelle: 'niveau1',
          critereEvaluation: this.formCompetenece.controls.critereEvaluation1.value,
          groupeAction: this.formCompetenece.controls.groupeAction1.value };
      }

      if (i === 1 ) {
        niveaux[i] = {
          libelle: 'niveau2',
          critereEvaluation: this.formCompetenece.controls.critereEvaluation2.value,
          groupeAction: this.formCompetenece.controls.groupeAction2.value };
      }

      if (i === 2 ) {
        niveaux[i] = {
          libelle: 'niveau3',
          critereEvaluation: this.formCompetenece.controls.critereEvaluation3.value,
          groupeAction: this.formCompetenece.controls.groupeAction3.value };
      }
    }
    const competences = new Array({
      libelle: this.formCompetenece.controls.libelle.value,
      descriptif: this.formCompetenece.controls.descriptif.value,
      niveaux
    });
    const competencesCreate = competences[0];
    if (this.formCompetenece.valid) {
      this.competenceService.postCompetence(competencesCreate).pipe(first()).subscribe(
        comp => {
          console.log('Success');
          this.message.add({severity: 'success', summary: 'Success', detail: 'Competence is create'});
          this.formCompetenece = new FormGroup(
            {
              libelle: new FormControl(''),
              descriptif: new FormControl(''),
              critereEvaluation1: new FormControl(''),
              groupeAction1: new FormControl(''),
              critereEvaluation2: new FormControl(''),
              groupeAction2: new FormControl(''),
              critereEvaluation3: new FormControl(''),
              groupeAction3: new FormControl(''),
            });
        });
    }
    console.log(competences );
  }

}
