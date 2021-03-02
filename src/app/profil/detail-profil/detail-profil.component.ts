import { Component, OnInit } from '@angular/core';
import {ProfilService} from '../service/profil.service';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: ['./detail-profil.component.scss']
})
export class DetailProfilComponent implements OnInit {
  selectId: number;
  profil: any;
  constructor(private profilService: ProfilService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectId = this.router.snapshot.params.id;
    this.profilService.getProfilById(this.selectId).pipe(first()).subscribe(
      pro => {
        this.profil = pro;
        console.log(this.profil);
      });
  }

}
