import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allteams } from 'src/app/Data/temasData';
import { TeamsService } from 'src/app/service/teams.service';

@Component({
  selector: 'app-teams-info',
  templateUrl: './teams-info.component.html',
  styleUrls: ['./teams-info.component.css']
})
export class TeamsInfoComponent implements OnInit {
  id:any;
  title:string ="team info";
  team:any ={};
  teams:any =allteams;
  teamId:any
 

  constructor( private activatedRoute:ActivatedRoute,private serviceTeam:TeamsService) {}

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.serviceTeam.getTeamById(this.teamId).subscribe(
      (data)=>{
       
            console.log("here teamTab", data.Team);
            this.team = data.Team
      }
    );
  }

}
