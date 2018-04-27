import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/authentication.service';
import { WebStorageService } from '../../services/webStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //get url hash params if any
  private params = this.extractParamsFromUrl();
  public name;

  constructor(private spotify: SpotifyService, private auth: AuthService, private storage: WebStorageService) { }

  ngOnInit() {
    this.extractParamsFromUrl();
    if (!this.name) {
      this.getMe();
    }
  }

  extractParamsFromUrl() {
    if (window.location.hash) {
      //get uri params
      var params = this.spotify.getHashParams();
      //save statekey and state
      this.storage.setItem(this.spotify.stateKey, params['state']);
      //save token
      this.storage.setItem('access_token', params['access_token']);

      //pass params to auth service
      this.auth.params = params;
    }
  }

  getMe() {
    this.spotify.getMe()
      .subscribe(res => {
        this.name = res['display_name'] || res['id'];
      }, err => {
        if (err.status == 401) {
          this.auth.logout();
        }
      })
  }

}
