import { Component, OnInit } from '@angular/core';
import { WebStorageService } from '../../services/webStorage.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

export class NotFoundComponent implements OnInit {
  public isLoggedIn = null;

  constructor(private storage: WebStorageService) { }

  ngOnInit() {
    this.isLoggedIn = null;
    if (this.storage.getItem('access_token')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
