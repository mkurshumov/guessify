import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { WebStorageService } from '../services/webStorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: WebStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.storage.getItem('access_token') || '';

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
