import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebStorageService } from './webStorage.service';

@Injectable()
export class SpotifyService {
  private client_id: string = '0d1c1648a7284c1ba8adec75f9fb6840';
  private redirect_uri: string = 'http://localhost:4200/callback';
  private scope: string = 'user-read-private user-read-email user-follow-read playlist-read-collaborative playlist-read-private';
  private url: string;
  private baseUrl = 'https://api.spotify.com/v1/';

  public stateKey: string = 'spotify_auth_state';
  public state: string;

  constructor(private http: HttpClient, private storage: WebStorageService) { }

  redirectToSpotify() {
    this.state = this.generateRandomString(16);
    this.storage.setItem(this.stateKey, this.state);

    this.url = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + encodeURIComponent(this.client_id) + '&scope=' + encodeURIComponent(this.scope) + '&redirect_uri=' + encodeURIComponent(this.redirect_uri) + '&state=' + encodeURIComponent(this.state) + '&show_dialog=true';

    window.location.href = this.url;
  }

  generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);

    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
  }

  getMe() {
    return this.http.get(this.baseUrl + 'me');
  }

  getMyPlaylists() {
    return this.http.get(this.baseUrl + 'me/playlists');
  }

  getTracks(href) {
    return this.http.get(href);
  }

}
