import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication.service';
import { WebStorageService } from '../../../services/webStorage.service';
import { SpotifyService } from '../../../services/spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public name;
  public country;
  public link;
  public email;

  public isCallback;

  constructor(private router: Router, private auth: AuthService, private storage: WebStorageService, private spotify: SpotifyService) { }

  ngOnInit() {
    console.log('header init');

    //check for saved me info
    if (this.storage.getItem('name') == undefined) {
      this.getMe();
    } else {
      this.name = this.storage.getItem('name');
      this.country = this.storage.getItem('country');
      this.link = this.storage.getItem('link');
      this.email = this.storage.getItem('email');
    }
  }

  getMe() {
    this.spotify.getMe()
      .subscribe(res => {
        this.saveMe(res);
      }, err => {
        if (err.status == 401) {
          this.auth.logout();
        }
      })
  }

  saveMe(res) {
    var meObj = {
      country: res['country'],
      name: res['display_name'] || res['id'],
      email: res['email'],
      link: res['external_urls']['spotify']
    }
    //save me info
    for (var key in meObj) {
      if (meObj.hasOwnProperty(key)) {
        this.storage.setItem(key, meObj[key]);
      }
    }
    //assign values to model
    this.name = res['display_name'] || res['id'];
    this.country = res['country'];
    this.link = res['link'];
    this.email = res['email'];
  }

  toSpotifyMe() {
    window.location.href = this.link;
  }

  logout() {
    this.auth.logout();
  }



}
