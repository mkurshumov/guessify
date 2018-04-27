import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(): any {
    return new Promise((resolve) => {
      this.authService.isTokenValid()
        .then(res => {
          resolve(true);
        })
        .catch(err => {
          //if not logged in > redirect
          this.authService.logout();
          resolve(false);
        });
    })
  }
}
