import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Injectable()
export class PublicGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): any {
    return new Promise((resolve) => {
      this.authService.isTokenValid()
        .then(res => {
          //if logged in > redirect
          this.router.navigate(['/home']);
          resolve(false);
        })
        .catch(err => {
          resolve(true);
        });
    })
  }
}
