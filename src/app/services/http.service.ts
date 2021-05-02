import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
//Simple service to handle all of our HTTP
export class HttpService {

  constructor(private http: HttpClient) { }

  // Our interceptors will handle the auth and errors 
  HttpGet(url:string): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + url)
  }

  HttpPost = (url:string) => {
    return this.http.post(environment.apiUrl + url,{observe: 'body', responseType: 'json'})
  }

}
