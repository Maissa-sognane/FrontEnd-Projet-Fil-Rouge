import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-referentiel',
  templateUrl: './referentiel.component.html',
  styleUrls: ['./referentiel.component.scss']
})
export class ReferentielComponent implements OnInit {

  items: any;

  activeItem: any;
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: 'liste'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    this.activeItem = this.items[0];
  }

}
