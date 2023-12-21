import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { allteams } from 'src/app/Data/temasData';
import { TeamsService } from 'src/app/service/teams.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
teams:any =[]
teamForm:FormGroup;
path:string
teamTotal :any =[];
obj:any={};
isDisplayed:boolean=false;
  constructor(private router:Router,private teamsServices:TeamsService) { }

  ngOnInit() {
   // appel de la methode du service
   this.teamsServices.getAllTeams().subscribe(
      
    (data)=> {
      console.log("here reponse", data);
      console.log("here teamsTab", data.t);
      
      this.teams = data.t;
      
    }
  
 );
  
   
 }
 goToDisplay(id:number){
  this.router.navigate ([`teamsInfo/${id}`])
 }
 EDIT(id:number){
  this.router.navigate ([`EditTeam/${id}`]) 
}
deleteTeamsById(id:number){
  this.teamsServices.deleteTeams(id).subscribe(
    (data)=>{
      console.log('here after delete', data.message);
      this.teamsServices.getAllTeams().subscribe(
        (data)=>{
          this.teams = data.t;
          
        }
      )
      
    }
  );
}

searchTeam(){
  this.teams=allteams;
  this.teamTotal=[];
  for (let i = 0; i <this.teams.length; i++) {
    if (this.teams[i].staduim == this.obj.search )
    {
      this.teamTotal.push(this.teams[i]);
    }
   
    
  }
  this.teams =this.teamTotal;
  
 
}




}


