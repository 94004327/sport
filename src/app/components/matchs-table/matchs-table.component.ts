import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaatchServiceService } from 'src/app/service/maatch-service.service';

@Component({
  selector: 'app-matchs-table',
  templateUrl: './matchs-table.component.html',
  styleUrls: ['./matchs-table.component.css']
})
export class MatchsTableComponent implements OnInit {
  matches:any=[];

  constructor(private router: Router,
    private matchService:MaatchServiceService) { }

  ngOnInit() {
    // this.matches=allMatches;
     // appel de la methode du service
     this.matchService.getAllMatches().subscribe(
      
        (data)=> {
          console.log("here reponse", data);
          console.log("here matchesTab", data.t);
          
          this.matches = data.t;
          
        }
      
     );
    //subscribe :donne le reponse (reterun)de maniere   
  }

  goToDisplay(id:number){
   this.router.navigate ([`matchInfo/${id}`])
   
  }
  EDIT(id:number){
    this.router.navigate ([`matchEdit/${id}`]) 
  }
  deleteMatchById(id:number){
    this.matchService.deleteMatch(id).subscribe(
      (data)=>{
        console.log('here after delete', data.message);
        this.matchService.getAllMatches().subscribe(
          (data)=>{
            this.matches = data.t;
            
          }
        )
        
      }
    );
  }



  }
 


