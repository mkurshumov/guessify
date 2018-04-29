import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService } from './services/webStorage.service';
import { SpotifyService } from './services/spotify.service';
import { AuthService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private storage: WebStorageService, private spotify: SpotifyService, private auth: AuthService) { }

  ngOnInit() {
    this.extractParamsFromUrl();
  }

  extractParamsFromUrl() {
    if (window.location.hash) {
      //get uri params
      var params = this.spotify.getHashParams();
      //save statekey and state
      this.storage.setItem(this.spotify.stateKey, params['state']);
      //save token
      this.storage.setItem('access_token', params['access_token']);
    }
  }
}
