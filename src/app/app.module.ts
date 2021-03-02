import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// @ts-ignore
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

import {AccordionModule} from 'primeng/accordion';
// @ts-ignore
import {ConfirmationService, MenuItem, MessageService, SharedModule} from 'primeng/api';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {AuthGuard} from './_helpers/auth.guard';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserItemComponent } from './user/user-item/user-item.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {CustomerService} from './customerservice';
import {ProgressBarModule} from 'primeng/progressbar';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
// @ts-ignore
import {CardModule} from './theme/shared/components';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import { ProfilComponent } from './profil/profil.component';
import {StepsModule} from 'primeng/steps';
import {InplaceModule} from 'primeng/inplace';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import {MDBBootstrapModule, MDBRootModule} from 'angular-bootstrap-md';


// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { CompetencesComponent } from './competences/competences.component';
import { CreateCompetenceComponent } from './competences/create-competence/create-competence.component';
import { ListeCompetenceComponent } from './competences/liste-competence/liste-competence.component';
import {BasicTabsPillsRoutingModule} from './demo/ui-elements/ui-basic/basic-tabs-pills/basic-tabs-pills-routing.module';
import {ListboxModule} from 'primeng/listbox';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TabViewModule} from 'primeng/tabview';
import {PickListModule} from 'primeng/picklist';
import {OrderListModule} from 'primeng/orderlist';
import { EditCompetenceComponent } from './competences/edit-competence/edit-competence.component';
import {SidebarModule} from 'primeng/sidebar';
import { GroupecompetenceComponent } from './groupecompetence/groupecompetence.component';
import { CreateGroupecompetenceComponent } from './groupecompetence/create-groupecompetence/create-groupecompetence.component';
import { EditGroupecompetenceComponent } from './groupecompetence/edit-groupecompetence/edit-groupecompetence.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { ListeGroupecompetenceComponent } from './groupecompetence/liste-groupecompetence/liste-groupecompetence.component';
import {FieldsetModule} from 'primeng/fieldset';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';
import {ChipsModule} from 'primeng/chips';
import {AutoComplete, AutoCompleteModule} from 'primeng/autocomplete';
import {ChipModule} from 'primeng/chip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { DetailProfilComponent } from './profil/detail-profil/detail-profil.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { ReferentielComponent } from './referentiel/referentiel.component';
import { ListReferentielComponent } from './referentiel/list-referentiel/list-referentiel.component';
import { CreateReferentielComponent } from './referentiel/create-referentiel/create-referentiel.component';
import {TooltipModule} from 'primeng/tooltip';


registerPlugin(FilePondPluginFileValidateType);
// @ts-ignore

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    TestComponent,
    UserComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserItemComponent,
    ProfilComponent,
    CompetencesComponent,
    CreateCompetenceComponent,
    ListeCompetenceComponent,
    EditCompetenceComponent,
    GroupecompetenceComponent,
    CreateGroupecompetenceComponent,
    EditGroupecompetenceComponent,
    ListeGroupecompetenceComponent,
    DetailProfilComponent,
    ReferentielComponent,
    ListReferentielComponent,
    CreateReferentielComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        NgbDropdownModule,
        NgbTooltipModule,
        NgbButtonsModule,
        NgbTabsetModule,
        HttpClientModule,
        ButtonModule,
        RippleModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
        AvatarModule,
        AvatarGroupModule,
        ToolbarModule,
        FileUploadModule,
        MultiSelectModule,
        CardModule,
        ReactiveFormsModule,
        StepsModule,
        InplaceModule,
        MessagesModule,
        MessageModule,
        FilePondModule,
        DropdownModule,
        BasicTabsPillsRoutingModule,
        SharedModule,
        ListboxModule,
        ScrollPanelModule,
        TabViewModule,
        OrderListModule,
        SidebarModule,
        TabMenuModule,
        FieldsetModule,
        DataViewModule,
        RatingModule,
        ChipsModule,
        AutoCompleteModule,
        ChipModule,
        MessageModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        VirtualScrollerModule,
        TooltipModule,
    ],
  providers: [
    NavigationItem,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    CustomerService,
    MessageService,
    ConfirmationService
    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
