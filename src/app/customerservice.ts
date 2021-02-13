import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer';
import {UserService} from './_services/user.service';

@Injectable()
export class CustomerService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getCustomersLarge() {
    return this.http.get<any>('assets/customers-large.json')
      .toPromise()
      .then(res => res.data as Customer[])
      .then(data => data);
  }
}
