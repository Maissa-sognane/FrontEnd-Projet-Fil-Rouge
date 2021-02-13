import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'multipart/form-data'})
  };

  getCompetencesAll() {
    return this.http.get(`${environment.apiUrl}/api/admin/grpecompetences`, this.httpOptions);
  }
  postGroupeCompetence(data) {
    return this.http.post(`${environment.apiUrl}/api/admin/grpecompetences`, data);
  }
  getCompetenceById(id) {
    return this.http.get(`${environment.apiUrl}/api/admin/competence/${id}`, this.httpOptions);
  }
  putCompetence(id, competence) {
    return this.http.put(`${environment.apiUrl}/api/admin/competence/${id}`, competence);
  }
  postCompetence(competence) {
    return this.http.post(`${environment.apiUrl}/api/admin/competences`, competence);
  }
  getCompetences() {
    return this.http.get(`${environment.apiUrl}/api/admin/competences`, this.httpOptions);
  }
}
