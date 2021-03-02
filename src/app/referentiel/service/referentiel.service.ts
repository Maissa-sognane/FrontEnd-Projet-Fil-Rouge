import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Referentiel} from '../../_models/referentiel';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'multipart/form-data'})
  };

  getReferentielsAll() {
    /*
    return this.http.get<any>(`${environment.apiUrl}/api/admin/referentiels`)
      .toPromise()
      .then(res => <Referentiel>res.data)
      .then(data => { return data; } );
     */
    return this.http.get<Referentiel[]>(`${environment.apiUrl}/api/admin/referentiels`, this.httpOptions);
  }
}
