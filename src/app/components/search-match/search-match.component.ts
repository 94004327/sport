import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-match',
  templateUrl: './search-match.component.html',
  styleUrls: ['./search-match.component.css']
})
export class SearchMatchComponent implements OnInit {
  searchForm:FormGroup
  obj:any={};
  title:string="search Match By team"
  constructor(private router:Router) { }

  ngOnInit() {
  }

  search(){
    localStorage.setItem('teamToFind', JSON.stringify(this.obj));
   
    
    this.router.navigate (['allMAtches/search']) 
   
  }

}
