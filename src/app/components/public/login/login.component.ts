import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { AuthService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private spotify: SpotifyService, private auth: AuthService) { }

  ngOnInit() { }

  login() {
    this.spotify.redirectToSpotify();
  }
}
