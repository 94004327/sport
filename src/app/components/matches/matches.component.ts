import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/Data/matchesData';
import { MaatchServiceService } from 'src/app/service/maatch-service.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches:any=[];
  title:string="matches"
  teamToFind:any;
  findMatches :any =[];
  path:string;

  constructor(private router :Router,private matchSerive:MaatchServiceService) { }

  ngOnInit() {
    this.matches= allMatches;
    // appel de la methode du service
    this.matchSerive.getAllMatches().subscribe(
      (data)=> {
        console.log("here reponse", data);
        console.log("here matchesTab", data.t);
       
        this.matches = data.t;
        
      }
    );
    console.log(this.matches)
    this.teamToFind = JSON.parse(localStorage.getItem('teamToFind'));
    for (let i = 0; i<this.matches.length; i++) {
      if (this.matches[i].teamsOne == this.teamToFind.team ||
        this.matches[i].teamsTwo ==this.teamToFind.team ) {
        this.findMatches.push(this.matches[i]);
      }
      
      console.log(this.findMatches);
      
    }
     this.path = this.router.url;
     if (this.path == '/allMAtches/search') {
      this.matches=this.findMatches;
      
    }
  }

}
