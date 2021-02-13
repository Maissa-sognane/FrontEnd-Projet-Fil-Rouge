import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { User } from '../_models/user';
import { AuthenticationService } from './authentication.service';
import {catchError, finalize, first} from 'rxjs/operators';
import {UserService} from './user.service';

export class UsersDatasource implements DataSource<User> {

  private UserSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {

  }

  // tslint:disable-next-line:typedef
  loadUser(userId: number,
           filter: string,
           sortDirection: string,
           pageIndex: number,
           pageSize: number){

    this.loadingSubject.next(true);

    this.userService.findUsers(userId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(users => this.UserSubject.next(users));
  }
  // tslint:disable-next-line:typedef
  loadAllUsers() {
    this.loadingSubject.next(true);
    this.userService.getUserAll().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(users => this.UserSubject.next(users));
  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    console.log("Connecting data source");
    return this.UserSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.UserSubject.complete();
    this.loadingSubject.complete();
  }

}
