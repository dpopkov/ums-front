import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly API_URL = environment.BASE_URL + '/api/authentication';

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(this.API_URL + '/sign-in', user).pipe(
      map(response => {
        if (response) {
          this.setSessionUser(response);
        }
        return response;
      })
    );
  }

  setSessionUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  register(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/sign-up', user);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }

  refreshToken(): Observable<any> {
    return this.http.post(this.API_URL + '/refresh-token?token=' + this.currentUserValue?.refreshTokenId, {});
  }
}
