import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptorService {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Authorization = 'Bearer 33b55673-57c7-413f-83ed-5b4ae8d18827';
    return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
  }
}