import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // @ts-ignore
  private URL: string;
  constructor(private httpClient: HttpClient) { }

  // @ts-ignore
  public sendFileDocuments(formData) {
    return this.httpClient.post(`${environment.apiUrl}/api/admin/users`, formData);

  }
}
