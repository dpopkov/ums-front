import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestBaseService } from './request-base.service';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends RequestBaseService {

  readonly API_URL = environment.BASE_URL + '/api/admin';

  constructor(authenticationService: AuthenticationService,
              http: HttpClient) {
    super(authenticationService, http);
  }

  findAllUsers(): Observable<any> {
    return this.http.get(this.API_URL + '/all', {headers: this.getHeaders});
  }
}
