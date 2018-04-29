import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  public user;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getMeData();
  }

  getMeData() {
    this.data.getData()
      .subscribe(res => {
        this.user = res;
      })
  }
}
