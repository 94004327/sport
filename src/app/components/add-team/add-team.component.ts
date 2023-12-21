import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allteams } from 'src/app/Data/temasData';
import { TeamsService } from 'src/app/service/teams.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  addTeam:FormGroup;
  obj:any={};
  
  teamsTab:any;
  teamsId:any;
  title:string="add-team"
  teams:any =allteams;
  constructor( private activatedRoute:ActivatedRoute,
    private teamsServices:TeamsService,private router:Router
    ) { }

  ngOnInit() {
    
    this.teamsId = this.activatedRoute.snapshot.paramMap.get("id")
    
    if (this.teamsId) {
     this.title ="Edit Match" ;
     this.teamsServices.getTeamById(this.teamsId).subscribe(
      
      (data)=>{
        console.log('here is match obj',data.findedTeam);
        this.obj=data.findedTeam;
      }
     );
  
      
    }
   
  }
  addTeamForm(){
    if (this.teamsId) {
     
      //Edit
      this.teamsServices.updatTeams(this.obj).subscribe(
        (data) =>{
          console.log('here edit teams', data);
          this.router.navigate(['admin']);
        }
      );
     
    }
    else{
      // Add
      this.teamsServices.addTeams(this.obj).subscribe(
        (data) => {
            console.log('here data', data);
            this.router.navigate(['admin']);
         
        }
      ); 
    }
    
   
  }
 
 
  

}
