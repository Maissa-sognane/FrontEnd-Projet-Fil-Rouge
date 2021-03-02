import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import {TestComponent} from './test/test.component';
import {AuthGuard} from './_helpers/auth.guard';
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from './user/user-create/user-create.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {ProfilComponent} from './profil/profil.component';
import {CompetencesComponent} from './competences/competences.component';
import {ListeCompetenceComponent} from './competences/liste-competence/liste-competence.component';
import {CreateCompetenceComponent} from './competences/create-competence/create-competence.component';
import {EditCompetenceComponent} from './competences/edit-competence/edit-competence.component';
import {GroupecompetenceComponent} from './groupecompetence/groupecompetence.component';
import {ListeGroupecompetenceComponent} from './groupecompetence/liste-groupecompetence/liste-groupecompetence.component';
import {CreateGroupecompetenceComponent} from './groupecompetence/create-groupecompetence/create-groupecompetence.component';
import {EditGroupecompetenceComponent} from './groupecompetence/edit-groupecompetence/edit-groupecompetence.component';
import {DetailProfilComponent} from './profil/detail-profil/detail-profil.component';
import {ReferentielComponent} from './referentiel/referentiel.component';
import {ListReferentielComponent} from './referentiel/list-referentiel/list-referentiel.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  },
  {
    path: 'home',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./demo/pages/core-maps/core-maps.module').then(module => module.CoreMapsModule)
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: 'test',
        component: TestComponent
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'user-create',
            component: UserCreateComponent,
          },
          {
            path: 'user-liste',
            component: UserListComponent
          }
        ],
      },
      {
        path: 'profil',
        component: ProfilComponent,
        children: [
          {
            path: ':id/users',
            component: DetailProfilComponent
          }
        ]
      },
      {
        path: 'competences',
        component: CompetencesComponent,
        children: [
          {
            path: 'lister-competence',
            component: ListeCompetenceComponent,
            children: [
              {
                path: 'edit-competence/:id',
                component: EditCompetenceComponent
              }
            ]
          },
          {
            path: 'creation-competence',
            component: CreateCompetenceComponent
          }
        ]
      },
      {
        path: 'groupe-competence',
        component: GroupecompetenceComponent,
        children: [
          {
            path: 'liste',
            component: ListeGroupecompetenceComponent,
            children: [
              {
                path: 'edit/:id',
                component: EditGroupecompetenceComponent
              }
            ]
          },
          {
            path: 'creation',
            component: CreateGroupecompetenceComponent
          },
        ]
      },
      {
        path: 'referentiel',
        component: ReferentielComponent,
        children: [
          {
            path: 'liste',
            component: ListReferentielComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
