import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Email } from '../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class MailService {
  apiUrl = environment.url+'email';

  constructor(
    private http: HttpClient
  ) { }

  sendMail(email: Email) {
    return this.http.post(this.apiUrl + "/", email, { responseType: 'json' })
  }


  isInProgress() {
    return this.http.get<boolean>(this.apiUrl + "/isInProgress", { responseType: 'json' })
  }

  getRestant() {
    return this.http.get<number>(this.apiUrl + "/getRestant", { responseType: 'json' })
  }

  getTotal() {
    return this.http.get<number>(this.apiUrl + "/getTotal", { responseType: 'json' })
  }

  
}
