import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  time:any;
  hours:any;
  mini:any;
  menuaction:any=1;
  ngOnInit(): void {
    this.time = new Date();
    this.hours = this.time.getHours();
    this.mini = this.time.getMinutes();
  }
  menuclick(index){
    this.menuaction = index;
    alert(index);
  }
}
