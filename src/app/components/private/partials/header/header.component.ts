import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/authentication.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public user;

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit() {
    this.getMeData();
  }

  logout() {
    this.auth.logout();
  }

  getMeData() {
    this.data.getData().subscribe(res => {
      this.user = res;
    })
  }
}
