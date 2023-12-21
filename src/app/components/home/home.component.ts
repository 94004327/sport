import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
match:any= {id:1, teamsOne:"FCB", teamsTwo:"RMD", scoreOne:1, scoreTwo:2 }
 
  constructor() { }

  ngOnInit() {
  }

}
