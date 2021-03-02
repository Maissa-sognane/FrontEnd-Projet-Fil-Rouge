import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Profil } from '../../_models/profil';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }
  // @ts-ignore
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
  };

  form: FormGroup = new FormGroup({
    libelle: new FormControl('', Validators.required),
  });

  // tslint:disable-next-line:typedef
  getAllProfils() {
    return this.http.get<Profil[]>(`${environment.apiUrl}/api/admin/profils`,  this.httpOptions);
  }

  createProfil(data): Observable<Profil[]> {
    console.log(data);
    return this.http.post<Profil[]>(`${environment.apiUrl}/api/admin/profils`, data, this.httpOptions);
  }

  updateProfil(id, data): Observable<Profil[]> {
    return this.http.put<Profil[]>(`${environment.apiUrl}/api/admin/profil/${id}`, data, this.httpOptions);
  }
  getProfilById(id) {
    return this.http.get(`${environment.apiUrl}/api/admin/profil/${id}`);
  }

  delete(id, data): Observable<Profil[]> {
    // @ts-ignore
    return this.http.delete<Profil[]>(`${environment.apiUrl}/api/admin/profil/${id}`, data, this.httpOptions);
  }

  // tslint:disable-next-line:typedef
  initializeFormGroup() {
    this.form.setValue({
      libelle: '',
    });
  }
}
