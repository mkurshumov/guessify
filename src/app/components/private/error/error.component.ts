import { Component, OnInit } from '@angular/core';
import { WebStorageService } from '../../../services/webStorage.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {
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
