import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  title:string ="Teams";
  
  obj:any={};
 
  teamTotal :any =[];
  path:string;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  
}
