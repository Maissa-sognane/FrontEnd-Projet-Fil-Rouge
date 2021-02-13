import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-edit-groupecompetence',
  templateUrl: './edit-groupecompetence.component.html',
  styleUrls: ['./edit-groupecompetence.component.scss']
})
export class EditGroupecompetenceComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  retourListe() {
    this.route.navigate(['home/groupe-competence/liste']);
  }
}
