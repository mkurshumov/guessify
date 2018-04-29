import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { WebStorageService } from './webStorage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private meUrl: string = 'https://api.spotify.com/v1/me';
  private access_token: string;
  private state: string;
  private storedState: string;

  public params: object;

  constructor(private http: HttpClient, private storage: WebStorageService, private router: Router) { }

  isTokenValid() {
    return this.http.get(this.meUrl).toPromise();
  }

  logout() {
    this.storage.clearLocalStorage();
    this.router.navigate(['login']);
  }

}
