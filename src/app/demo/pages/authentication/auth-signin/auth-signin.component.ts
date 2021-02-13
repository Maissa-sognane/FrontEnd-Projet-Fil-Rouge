import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../_services/authentication.service';
import {first} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  pathImg: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.pathImg = '';
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          const user = this.authenticationService.userValue.token;
          const tokenDeco = jwtDecode(user);
          // @ts-ignore
          const role = tokenDeco.roles[0];
          // console.log(tokenDeco.roles[0]);
          if (role === 'ROLE_ADMIN') {
           this.router.navigate(['home']);
          }
          if (role === 'ROLE_FORMATEUR') {
          //  this.router.navigate(['/formateurs']);
          }
          if (role === 'ROLE_APPRENANT') {
           // this.router.navigate(['/apprenants']);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }
}
