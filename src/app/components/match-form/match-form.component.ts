import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allMatches } from 'src/app/Data/matchesData';
import { MaatchServiceService } from 'src/app/service/maatch-service.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  title:string="Add-Form"
  matchId:any;
  matchForm:FormGroup;
obj:any={};
 
  matches:any=allMatches



  constructor(private activatedRouter:ActivatedRoute ,
    private matchService:MaatchServiceService,
    private router:Router) { }

  ngOnInit() {
    
   
    this.matchId = this.activatedRouter.snapshot.paramMap.get("id")
    
    if (this.matchId) {
     this.title ="Edit Match" ;
     this.matchService.getMatchById(this.matchId).subscribe(
      
      (data)=>{
        console.log('here is match obj',data.findedMatch);
        this.obj=data.findedMatch;
      }
     );
  
      
    }
   
    
  }

   addOrEditMatch(){
    if (this.matchId) {
     
      //Edit
      this.matchService.updateMatch(this.obj).subscribe(
        (data) =>{
          console.log('here edit match', data);
          this.router.navigate(['admin']);
        }
      );
        
      
      
    }
    else{
      // Add
      this.matchService.addMatch(this.obj).subscribe(
        (data) => {
            console.log('here data', data);
            this.router.navigate(['admin']);
         
        }
      ); 
    }
    
   
  }
 

}
