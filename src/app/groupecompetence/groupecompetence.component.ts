import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupecompetence',
  templateUrl: './groupecompetence.component.html',
  styleUrls: ['./groupecompetence.component.scss']
})
export class GroupecompetenceComponent implements OnInit {
  items: any;

  activeItem: any;
  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Liste Groupe Competence',
        icon: 'pi pi-fw pi-align-justify',
        routerLink: 'liste'
      },
      {
        label: 'Creation Groupe Competence',
        icon: 'pi pi-fw pi-plus',
        routerLink: 'creation'
      },
    ];

    this.activeItem = this.items[0];
  }

}
