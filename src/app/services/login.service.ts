import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/";
  // url="http://iot-env.ap-south-1.elasticbeanstalk.com:8080/";

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.url + "customer/authenticate", { email: email, password: password }, httpOptions).pipe(
    );
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post(this.url + "customer/register", { firstName: firstName, lastName: lastName, email: email, password: password }, httpOptions).pipe(
    );
  }

}
