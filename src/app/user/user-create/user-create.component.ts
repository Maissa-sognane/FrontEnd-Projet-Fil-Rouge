import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ProfilService} from '../../profil/service/profil.service';
import {first} from 'rxjs/operators';
import {Profil} from '../../_models/profil';
import {UpdateLogger} from '@angular/cdk/schematics/update-tool/logger';
import {FileUploadService} from '../../_service/file-upload.service';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import {User} from '../../_models/user';
import {MessageService} from 'primeng/api';
import {FilePondComponent} from 'ngx-filepond/filepond.component';
import {FilePondOptions} from 'filepond';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})



export class UserCreateComponent implements OnInit {

  constructor(private profilService: ProfilService,
              private uploadFileReactiveFormObject: FileUploadService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private messageService: MessageService) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];
  }

  value2: string;
  cities: City[];
  selectedCities: City[];
  userForm: FormGroup;
  profils: Profil[];
  selectedProfils: Profil;
  uploadedFiles: any[] = [];
  user: User[];
  url = 'assets/images/user/avatar-2.jpg';
  private succesfully: any;
  @ViewChild('myPond') myPond: FilePondComponent;

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Drop files here...'
  };

  pondFiles: FilePondOptions['files'] = [
    {
      source: 'assets/photo.jpeg',
      options: {
        type: 'local'
      }
    }
  ];

  ngOnInit(): void {
    this.readProfils();
    // @ts-ignore
    this.userForm = new FormGroup(
      {
        prenom: new FormControl(null, Validators.required),
        nom: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        profil: new FormControl(null, Validators.required),
        avatar: new FormControl(null),
        password: new FormControl(null, Validators.required)
      }
    );
   /* this.userForm = this.formBuilder.group({
      avatar: ['']
    });*/
  }
  readProfils() {
    this.profilService.getAllProfils().pipe(first()).subscribe(profils => {
      this.profils = profils['hydra:member'];
      return this.profils;
    });
  }
  onUpload($event: any) {
    this.uploadedFiles.push($event.target.files[0]);
    console.log(this.uploadedFiles[0]);
  }

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event);
  }

  onFileChange($event) {
    /*if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.userForm.patchValue({
        avatar: file
      });
    }*/
  }
  onSelectFile(e) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.userForm.patchValue({
        avatar: file
      });
    }
  }
  onSubmit() {
    if (this.userForm.valid) {
      // @ts-ignore
      const lienProfil = this.userForm.value.profil['id'];
      console.log(this.userForm.value.profil['id']);
      this.userForm.controls.profil.setValue('api/admin/profil/' + lienProfil);
      const file = this.userForm.value.avatar;
      const formData: FormData = new FormData();
      formData.append('avatar', this.userForm.value.avatar);
      formData.append('prenom', this.userForm.value.prenom);
      formData.append('nom', this.userForm.value.nom);
      formData.append('email', this.userForm.value.email);
      formData.append('password', this.userForm.value.password);
      formData.append('profil', this.userForm.value.profil);
      console.log(this.uploadedFiles[0]);
      this.userService.createUser(formData).subscribe(
        res => {
          this.router.navigate(['home/user-liste']);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Utilisateur cree avec succes'});
          console.log('User created successfully!');
        },
          errors => {
        console.log(errors.value);
      });
     // console.log(this.uploadedFiles);
    }
  }
}
