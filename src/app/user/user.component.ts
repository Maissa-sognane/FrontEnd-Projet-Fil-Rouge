import { Component, OnInit } from '@angular/core';
import {Customer, Representative} from '../customer';
import {CustomerService} from '../customerservice';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  customers: any[];

  representatives: Representative[];

  statuses: any[];

  loading = true;

  activityValues: number[] = [0, 100];
  frozenValue: Customer[];

  dialogVisible: boolean;

  scrollableCols: any[];

  frozenCols: any[];
  users: User[];
  dataUser: User[];
  selectedUser: User;
  UserSelected: User;
  profil: string;

  constructor(
    private customerService: CustomerService,
    private userService: UserService
              ) {}

  ngOnInit(): void {
    this.customerService.getCustomersLarge().then(customers => {
   //   this.customers = customers;
      this.loading = false;
      this.customers.forEach(
        customer => (customer.date = new Date(customer.date))
      );
    });
    this.userService.getUserAll().pipe(first()).subscribe(users => {
      this.users = users;
      this.customers = users['hydra:member'];
     // console.log(cus);
    });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];

    this.frozenValue = [
      {
        id: 1255,
        name: 'James McAdams',
        country: {
          name: 'United States',
          code: 'us'
        },
        company: 'McAdams Consulting Ltd',
        date: '2014-02-13',
        status: 'qualified',
        activity: 23,
        representative: {
          name: 'Ioni Bowcher',
          image: 'ionibowcher.png'
        }
      },
      {
        id: 5135,
        name: 'Geraldine Bisset',
        country: {
          name: 'France',
          code: 'fr'
        },
        company: 'Bisset Group',
        status: 'proposal',
        date: '2019-05-05',
        activity: 0,
        representative: {
          name: 'Amy Elsner',
          image: 'amyelsner.png'
        }
      }
    ];

    this.frozenCols = [
      { field: 'name', header: 'Name' }
    ];

    this.scrollableCols = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' }
    ];

    this.readUsers();
  }
  onRowSelect(event) {
    // this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
    if (event) {
      this.UserSelected = event.data;
      this.profil = this.UserSelected['@type'];
      if (this.profil === 'User') {
        this.profil = 'Admin';
      }
    //  console.log(this.UserSelected['@type']);
    }
   // alert(event.data.prenom);
  }

  onRowUnselect(event) {
   // this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
    if (event) {
      this.UserSelected = event.data;
      this.profil = this.UserSelected['@type'];
      if (this.profil === 'User') {
        this.profil = 'Admin';
      }
    }
  }
  readUsers(): void {
  }
  readAdmin() {
   // alert('Admin');
  }
}
