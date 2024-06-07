import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessData = this.authSvc.getLoggedUser();

    if (!accessData) {
      return next.handle(req);
    }

    const newReq = req.clone({
      headers: req.headers.append(
        'Authorization', `Bearer ${accessData.token}`
      )
    });

    return next.handle(newReq);
  }
}
