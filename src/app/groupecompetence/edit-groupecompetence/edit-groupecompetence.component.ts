import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CompetencesService} from '../../_services/competences.service';
import {first} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-edit-groupecompetence',
  templateUrl: './edit-groupecompetence.component.html',
  styleUrls: ['./edit-groupecompetence.component.scss']
})
export class EditGroupecompetenceComponent implements OnInit {
  selectId: number;
  detailGrpeCompetence: any;
  formGrpeCompetence: FormGroup;
  editer = false;
  groupeCompetence: any;
  selectedCompetenceAdvanced: any[];
  filteredCompetences: any[];
  constructor(private route: Router,
              private router: ActivatedRoute,
              private grpeCompetenceServivce: CompetencesService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.selectId = this.router.snapshot.params.id;
    this.grpeCompetenceServivce.getGroupeCompetenceById(this.selectId).pipe(first()).subscribe(
      groupeComp => {
        this.detailGrpeCompetence = groupeComp;
      });
    this.formGrpeCompetence = new FormGroup(
      {
        libelle: new FormControl(),
        description: new FormControl(),
        competences: new FormControl(),
      });
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir quitter?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editer = false;
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Modification annuler'});
      },
      reject: (type) => {
        // tslint:disable-next-line:prefer-const
        let ConfirmEventType;
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
      }
    });
  }

  retourListe() {
    this.route.navigate(['home/groupe-competence/liste']);
  }
  editerChamp() {
    this.editer = true;
    this.grpeCompetenceServivce.getCompetences().pipe(first()).subscribe(
        grpeCompetences => {
          this.groupeCompetence = grpeCompetences['hydra:member'];
        });
  }
  filterCompetence(event) {
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.groupeCompetence.length; i++) {
      const comp = this.groupeCompetence[i];
      // tslint:disable-next-line:triple-equals
      if (comp.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(comp);
      }
    }
    this.filteredCompetences = filtered;
  }
  fermerChamp() {
    this.editer = false;
  }
  onSubmit() {
    if (this.formGrpeCompetence.valid) {
      if (this.formGrpeCompetence.controls.libelle.value === null || this.formGrpeCompetence.controls.libelle.value === '') {
        this.formGrpeCompetence.controls.libelle.setValue(this.detailGrpeCompetence.libelle);
      }
      if (this.formGrpeCompetence.controls.description.value === null || this.formGrpeCompetence.controls.description.value === '') {
        this.formGrpeCompetence.controls.description.setValue(this.detailGrpeCompetence.description);
      }
      if (this.formGrpeCompetence.controls.competences.value === null || this.formGrpeCompetence.controls.competences.value === '') {
        this.formGrpeCompetence.controls.competences.setValue(this.detailGrpeCompetence.competence);
      }
      this.grpeCompetenceServivce.putGroupeCometence(this.selectId, this.formGrpeCompetence.value).pipe(first()).subscribe(
        grpeComp => {
          console.log('Success');
          this.messageService.add({severity:'success', summary:'Confirmed', detail: 'Modification sauvegarder'});
          //  this.route.navigate(['home/groupe-competence/liste']);
        });
      console.log(this.formGrpeCompetence.value);
    }
  }
}
