import { Component, OnInit } from '@angular/core';
import {ReferentielService} from '../service/referentiel.service';
import {first} from 'rxjs/operators';
import {Referentiel} from '../../_models/referentiel';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-list-referentiel',
  templateUrl: './list-referentiel.component.html',
  styleUrls: ['./list-referentiel.component.scss']
})
export class ListReferentielComponent implements OnInit {
  referentiels: Promise<Referentiel[]>[];
  products: any[];
  virtualReferentiel: Referentiel[];
  sortKey: string;
  sortOptions: any[];
  sortOrder: number;
  sortField: string;
  visibleSidebar1: boolean;
  programme: string;
  fileExport: any;
  constructor(public referentielService: ReferentielService) { }

  ngOnInit(): void {
    /*
    this.referentiels = Array.from({length: 10}).map(() => this.referentielService.getReferentielsAll());
    this.virtualReferentiel = Array.from({length: 10});
    console.log(this.referentiels);
     */
    this.referentielService.getReferentielsAll().pipe(first()).subscribe(
      ref => {
        this.referentiels = ref['hydra:member'];
        console.log(this.referentiels);
      });
  }

  exportPdf(file) {
    this.fileExport = file.map( col => ({title: file.FichierProgramme}));
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        // @ts-ignore
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.fileExport, this.programme);
        doc.save('programme.pdf');
      });
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

  loadCarsLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      const loadedProducts = this.referentiels.slice(event.first, (event.first + event.rows));
      Array.prototype.splice.apply(this.virtualReferentiel, [...[event.first, event.rows], ...loadedProducts]);
      this.virtualReferentiel = [...this.virtualReferentiel];
    }, 1000);
  }

}
