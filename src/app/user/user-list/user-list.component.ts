import { Component, OnInit } from '@angular/core';
import {Customer, Representative} from '../../customer';
import {User} from '../../_models/user';
import {CustomerService} from '../../customerservice';
import {UserService} from '../../_services/user.service';
import {first} from 'rxjs/operators';
import {UserComponent} from '../user.component';
import {fromArray} from 'rxjs-compat/observable/fromArray';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

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
  UserAfficher = [];
  temoinAdmin = false;
  userRead = [];
  adminTab = [];
  id = null;
  userForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private userList: UserComponent,
    private messageService: MessageService
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
      // @ts-ignore
      this.users = users;
      this.UserAfficher = users['hydra:member'];
      this.userRead = users['hydra:member'];
      if (this.temoinAdmin === true) {
        alert('Admin');
      }
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
    this.userForm = new FormGroup(
      {
        prenom: new FormControl(),
        nom: new FormControl(),
        email: new FormControl(),
      });
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
    this.adminTab = [];
    this.temoinAdmin = true;
    this.userRead.forEach(user => this.attribProfil(user));
    this.UserAfficher = [];
    this.UserAfficher = this.adminTab;
    return this.UserAfficher;
  }
  readApprenant() {
    this.adminTab = [];
    this.userRead.forEach(user => this.attributProfilApprenant(user));
    this.UserAfficher = [];
    this.UserAfficher = this.adminTab;
    return this.UserAfficher;
  }
  readFormateur() {
    this.adminTab = [];
    this.userRead.forEach(user => this.attributProfilFormateur(user));
    this.UserAfficher = [];
    this.UserAfficher = this.adminTab;
    return this.UserAfficher;
  }
  readCM() {
    this.adminTab = [];
    this.userRead.forEach(user => this.attributProfilCM(user));
    this.UserAfficher = [];
    this.UserAfficher = this.adminTab;
    return this.UserAfficher;
  }
  attribProfil(user) {
    if (user['@type'] === 'User') {
      // @ts-ignore
      this.adminTab.push(user);
    }
  }
  attributProfilApprenant(user) {
    if (user['@type'] === 'Apprenant') {
      // @ts-ignore
      this.adminTab.push(user);
    }
  }
  attributProfilFormateur(user) {
    if (user['@type'] === 'Formateur') {
      // @ts-ignore
      this.adminTab.push(user);
    }
  }
  attributProfilCM(user) {
    if (user['@type'] === 'CM') {
      // @ts-ignore
      this.adminTab.push(user);
    }
  }

  editUser(user) {
    /*
        profil: new FormControl(null, Validators.required),
        avatar: new FormControl(null),
        password: new FormControl(null, Validators.required)
       */
    const formData: FormData = new FormData();
    if (this.userForm.value.prenom === null) {
      this.userForm.controls.prenom.setValue(user.prenom);
    }
    if (this.userForm.value.nom === null) {
      this.userForm.controls.nom.setValue(user.nom);
    }
    if (this.userForm.value.email === null) {
      this.userForm.controls.email.setValue(user.email);
    }
    formData.append('prenom', this.userForm.value.prenom);
    formData.append('nom', this.userForm.value.nom);
    formData.append('email', this.userForm.value.email);
    console.log(this.userForm.value);
    this.id = 2;
    // @ts-ignore
    this.userService.updateUser(1, JSON.stringify(this.userForm.value)).pipe(first()).subscribe(
      userEdit => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Utilisateur modifier'});
      });
  }
}
