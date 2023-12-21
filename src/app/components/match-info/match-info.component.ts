import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allMatches } from 'src/app/Data/matchesData';
import { MaatchServiceService } from 'src/app/service/maatch-service.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  title:string="Matchs Info"
  matchId:any;
  matches:any=allMatches
  findeMatch:any;

  constructor(private activatedRouter:ActivatedRoute,
    private matchService:MaatchServiceService) { }

  ngOnInit() {
  this.matchId = this.activatedRouter.snapshot.paramMap.get("id")
  this.matchService.getMatchById(this.matchId).subscribe(
    (data)=>{
      console.log("here reponse", data);
          console.log("here matchesTab", data.findedMatch);
          this.findeMatch = data.findedMatch
    }
  );

    
  }

}


