import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
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
