import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../_services/competences.service';
import {first} from 'rxjs/operators';
import {Groupecompetence} from '../../_models/groupecompetence';
import {FormControl, FormGroup} from '@angular/forms';
import {error} from 'highcharts';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-liste-competence',
  templateUrl: './liste-competence.component.html',
  styleUrls: ['./liste-competence.component.scss']
})
export class ListeCompetenceComponent implements OnInit {
  active = 'top';
  activeIndex = 0;
  grpecomptence: any;
  selectedGrpeCompetence: Groupecompetence;
  lesCompetences;
  niveaux;
  visibleSidebar5;
  competencesDetails;
  competenceForm: FormGroup;
  tabNiveauModifier: [];

  constructor(private competenceService: CompetencesService,
              private message: MessageService) { }

  ngOnInit(): void {
    this.competenceService.getCompetencesAll().pipe(first()).subscribe(
      groupeCompetence => {
        this.grpecomptence = groupeCompetence['hydra:member'];
      //  console.log(this.grpecomptence[0]['competence']);

      });
    this.competenceForm = new FormGroup(
      {
        libelle: new FormControl(),
        niveaux: new FormControl(),
        niveau1: new FormControl(),
        critereNiveau1: new FormControl(),
        groupeNiveau1: new FormControl(),
        niveau2: new FormControl(),
        critereNiveau2: new FormControl(),
        groupeNiveau2: new FormControl(),
        niveau3: new FormControl(),
        critereNiveau3: new FormControl(),
        groupeNiveau3: new FormControl(),
      });
  }
  recupererCompetence(competence) {
    this.niveaux = competence.niveaux;
  }
  detailCompetence(competence) {
      this.competencesDetails = competence;
      this.competenceForm = new FormGroup(
      {
        libelle: new FormControl(),
        niveaux: new FormControl(),
        niveau1: new FormControl(),
        critereNiveau1: new FormControl(),
        groupeNiveau1: new FormControl(),
        niveau2: new FormControl(),
        critereNiveau2: new FormControl(),
        groupeNiveau2: new FormControl(),
        niveau3: new FormControl(),
        critereNiveau3: new FormControl(),
        groupeNiveau3: new FormControl(),
      });
    //  console.log(this.competencesDetails['niveaux']);
  }
  TestAttrib(niveau1, niveauValue, niveauDefaultValue) {
    if (niveau1 != null && niveau1 != '') {
      niveauValue = niveau1;
    } else {
      niveauValue = niveauDefaultValue;
    }
  }
  onSubmit(competence) {
    if (this.competenceForm.controls.libelle.value === null) {
      this.competenceForm.controls.libelle.setValue(competence.libelle);
    }
    if (this.competenceForm.controls.niveaux.value === null) {
      this.competenceForm.controls.niveaux.setValue(competence.niveaux);
      // tslint:disable-next-line:triple-equals
    }
    /*
    let j = 1;
    for (let i = 0; i < this.competenceForm.controls.niveaux.value.length ; i++) {
    }*/
    // Niveau 1
    if (this.competenceForm.controls.critereNiveau1.value !== null && this.competenceForm.controls.critereNiveau1.value !== '') {
      this.competenceForm.controls.niveaux.value[0].critereEvaluation = this.competenceForm.controls.critereNiveau1.value;
    }
    if (this.competenceForm.controls.critereNiveau1.value === null || this.competenceForm.controls.critereNiveau1.value === '') {
      this.competenceForm.controls.niveaux.value[0].critereEvaluation = competence.niveaux[0].critereEvaluation;
    }
    if (this.competenceForm.controls.groupeNiveau1.value !== null && this.competenceForm.controls.groupeNiveau1.value !== '') {
      this.competenceForm.controls.niveaux.value[0].groupeAction = this.competenceForm.controls.groupeNiveau1.value;
    }
    if (this.competenceForm.controls.groupeNiveau1.value === null || this.competenceForm.controls.groupeNiveau1.value === '') {
      this.competenceForm.controls.niveaux.value[0].groupeAction = competence.niveaux[0].groupeAction;
    }
    // Niveau 2
    if (this.competenceForm.controls.critereNiveau2.value !== null && this.competenceForm.controls.critereNiveau2.value !== '') {
      this.competenceForm.controls.niveaux.value[1].critereEvaluation = this.competenceForm.controls.critereNiveau2.value;
    }
    if (this.competenceForm.controls.critereNiveau2.value === null || this.competenceForm.controls.critereNiveau2.value === '') {
      this.competenceForm.controls.niveaux.value[1].critereEvaluation = competence.niveaux[1].critereEvaluation;
    }
    if (this.competenceForm.controls.groupeNiveau2.value !== null && this.competenceForm.controls.groupeNiveau2.value !== '') {
      this.competenceForm.controls.niveaux.value[1].groupeAction = this.competenceForm.controls.groupeNiveau2.value;
    }
    if (this.competenceForm.controls.groupeNiveau2.value === null || this.competenceForm.controls.groupeNiveau2.value === '') {
      this.competenceForm.controls.niveaux.value[1].groupeAction = competence.niveaux[1].groupeAction;
    }

    if (this.competenceForm.controls.critereNiveau3.value !== null && this.competenceForm.controls.critereNiveau3.value !== '') {
      this.competenceForm.controls.niveaux.value[2].critereEvaluation = this.competenceForm.controls.critereNiveau3.value;
    }
    if (this.competenceForm.controls.critereNiveau3.value === null || this.competenceForm.controls.critereNiveau3.value === '') {
      this.competenceForm.controls.niveaux.value[2].critereEvaluation = competence.niveaux[2].critereEvaluation;
    }
    if (this.competenceForm.controls.groupeNiveau3.value !== null && this.competenceForm.controls.groupeNiveau3.value !== '') {
      this.competenceForm.controls.niveaux.value[2].groupeAction = this.competenceForm.controls.groupeNiveau3.value;
    }
    if (this.competenceForm.controls.groupeNiveau3.value === null || this.competenceForm.controls.groupeNiveau3.value === '') {
      this.competenceForm.controls.niveaux.value[2].groupeAction = competence.niveaux[2].groupeAction;
    }

    this.competenceService.putCompetence(competence.id, this.competenceForm.value).pipe(first()).subscribe(
      comp => {
        console.log('Success');
        this.visibleSidebar5 = false;
        this.message.add({severity: 'success', summary: 'Success', detail: 'Competence is update'});
      }
    );
  }


}
