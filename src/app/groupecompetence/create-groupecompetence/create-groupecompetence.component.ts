import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../_services/competences.service';
import {first} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-create-groupecompetence',
  templateUrl: './create-groupecompetence.component.html',
  styleUrls: ['./create-groupecompetence.component.scss']
})
export class CreateGroupecompetenceComponent implements OnInit {

  competences: [];
  competencesValues: any;
  filteredCompetences: any[];
  selectedCompetences: any[];
  selectedCompetenceAdvanced: any[];
  formGroupeCompetence: FormGroup;
  texts: string[] = [];
  newCompetence = false;
  submitted: boolean;
  nmbreChamp: any;
  tabGrpe = [];
  constructor(private servicecompetence: CompetencesService,
              private messageservice: MessageService) { }

  ngOnInit(): void {
    this.servicecompetence.getCompetences().pipe(first()).subscribe(
      comp => {
        this.competencesValues = comp['hydra:member'];
      });
    this.formGroupeCompetence = new FormGroup(
      {
          libelle: new FormControl('', Validators.required),
          descriptif: new FormControl('', Validators.required),
          competence: new FormControl('', Validators.required),
          nouvellecompetences: new FormControl()
      });
  }
  filterCompetence(event) {
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.competencesValues.length; i++) {
      const comp = this.competencesValues[i];
      // tslint:disable-next-line:triple-equals
      if (comp.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(comp);
      }
    }
    this.filteredCompetences = filtered;
  }
  generateChamp(val) {
    this.newCompetence = true ;
    console.log(val);
  }
  onSearchChange(searchValue: any): void {
    this.nmbreChamp = searchValue;
    this.newCompetence = true ;
    const tab = new Array({prenom: 'Abdou'});
    for (let i = 0; i < this.nmbreChamp; i++) {
      this.tabGrpe.push(tab);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroupeCompetence.valid) {
      // tslint:disable-next-line:prefer-for-of
      if (this.formGroupeCompetence.controls.nouvellecompetences.value.length >= 1) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < this.formGroupeCompetence.controls.nouvellecompetences.value.length ; i++) {
          this.formGroupeCompetence.controls.competence.value.push(this.formGroupeCompetence.controls.nouvellecompetences.value[i]);
        }
      }
      const competences = new Array({
        libelle: this.formGroupeCompetence.controls.libelle.value,
        description: this.formGroupeCompetence.controls.descriptif.value,
        competences: this.formGroupeCompetence.controls.competence.value
      });
      this.servicecompetence.postGroupeCompetence(competences[0]).pipe(first()).subscribe(
        grepe => {
          this.messageservice.add({severity: 'success', summary: 'Success', detail: 'groupeCompetence is create'});
        });
      console.log(competences);
      this.competences = [];
    }

  }
}
;
