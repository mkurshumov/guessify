import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/authentication.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})

export class PrivateComponent implements OnInit {
  private user;

  constructor(private spotify: SpotifyService, private auth: AuthService, private data: DataService) { }

  ngOnInit() {
    this.getMe();
  }

  getMe() {
    this.spotify.getMe()
      .subscribe(res => {
        this.user = {
          country: res['country'],
          name: res['display_name'] || res['id'],
          email: res['email'],
          link: res['external_urls']['spotify']
        };
        //store data in shared service
        this.data.setData(this.user);
      }, err => {
        if (err.status == 401) {
          this.auth.logout();
        }
      })
  }

}
