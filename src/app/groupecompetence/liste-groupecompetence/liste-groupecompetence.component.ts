import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../_services/competences.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-liste-groupecompetence',
  templateUrl: './liste-groupecompetence.component.html',
  styleUrls: ['./liste-groupecompetence.component.scss']
})
export class ListeGroupecompetenceComponent implements OnInit {
  groupecompetence: any;
  sortOrder: number;
  sortField: string;
  sortOptions: any;
  sortKey: any;
  editing = true;
  constructor(private competenceservice: CompetencesService) { }

  ngOnInit(): void {
    this.competenceservice.getCompetencesAll().pipe(first()).subscribe(
      grpecomp => {
        this.groupecompetence = grpecomp['hydra:member'];
        console.log(this.groupecompetence);
      });
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
    this.editing = false;
  }
}
