import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../_services/competences.service';
import {first} from 'rxjs/operators';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';

@Component({
  selector: 'app-liste-groupecompetence',
  templateUrl: './liste-groupecompetence.component.html',
  styleUrls: ['./liste-groupecompetence.component.scss']
})
export class ListeGroupecompetenceComponent implements OnInit {
  grpeCompetences: any;
  tabGrpe = [];
  groupecompetence: any;
  sortOrder: number;
  sortField: string;
  sortOptions: any;
  sortKey: any;
  editing = true;
  position: string;
  virtualProducts: any;
  constructor(private competenceservice: CompetencesService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.competenceservice.getCompetencesAll().pipe(first()).subscribe(
      grpecomp => {
        this.grpeCompetences = grpecomp['hydra:member'];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.grpeCompetences.length; i++) {
            if (this.grpeCompetences[i].isdeleted === false) {
              // @ts-ignore
              this.tabGrpe.push(this.grpeCompetences[i]);
            }
        }
        this.groupecompetence = this.tabGrpe;
        console.log(this.groupecompetence);
      });
  }

  loadCarsLazy(event: LazyLoadEvent) {
    // simulate remote connection with a timeout
    setTimeout(() => {
      const loadedProducts = this.groupecompetence.slice(event.first, (event.first + event.rows));
      Array.prototype.splice.apply(this.virtualProducts, [...[event.first, event.rows], ...loadedProducts]);
      this.virtualProducts = [...this.virtualProducts];
    }, 1000);
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  edit() {
    console.log('A');
  }
  confirm(event: Event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Voulez-vous archiver?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.competenceservice.deleteGroupeCometence(id).pipe(first()).subscribe(
          grpe => {
            this.messageService.add({severity: 'error', summary: 'Archivage', detail: 'Archiver'});
          });
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Annuler', detail: 'Annuler'});
      }
    });
  }
}
