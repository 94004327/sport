import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaatchServiceService } from 'src/app/service/maatch-service.service';

@Component({
  selector: 'app-search-match-by-score',
  templateUrl: './search-match-by-score.component.html',
  styleUrls: ['./search-match-by-score.component.css']
})
export class SearchMatchByScoreComponent implements OnInit {
  searchMatchForm:FormGroup;
  obj:any={};
  title:string="search Match By score"
  constructor( private router:Router, 
    private matchservice:MaatchServiceService) { }

  ngOnInit() {

  }
  searchMatchByScore(){
    this.router.navigate (['searchScore']) ;
    this.matchservice.search(this.obj).subscribe(
      (data)=>{
     
     console.log('here is data', data);
     if (data.m ) {
      console.log('Matches with score:', data.m);
     this.obj= data.m;
      

     
     
  } else {
      console.log('No matches found with  score.');
  }
  



     
   }
 );

  }

}
