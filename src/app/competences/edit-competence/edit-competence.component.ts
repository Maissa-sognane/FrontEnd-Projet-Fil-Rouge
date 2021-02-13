import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompetencesService} from '../../_services/competences.service';

@Component({
  selector: 'app-edit-competence',
  templateUrl: './edit-competence.component.html',
  styleUrls: ['./edit-competence.component.scss']
})
export class EditCompetenceComponent implements OnInit {

  selectedId: number;
  competences;
  constructor(private route: ActivatedRoute,
              private competenceService: CompetencesService) { }

  ngOnInit(): void {
     this.selectedId = this.route.snapshot.params['id'];
    console.log(this.selectedId);
    this.competenceService.getCompetenceById(this.selectedId).subscribe(
      comp => {
        this.competences = comp;
        console.log(this.competences);
      });
  }
  updateCompetence() {
    const selectedId = +this.route.snapshot.params['id'];
  }

}
