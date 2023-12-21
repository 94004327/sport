import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allPlayers } from 'src/app/Data/playersData';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-playear-info',
  templateUrl: './playear-info.component.html',
  styleUrls: ['./playear-info.component.css']
})
export class PlayearInfoComponent implements OnInit {
  title:string="Playear-Info"
  playearId:any;
  playears:any=allPlayers
  findeplayear:any;

  constructor(private activatedRouter:ActivatedRoute,
    private playerService:PlayerService) { }


  ngOnInit() {
    this.playearId = this.activatedRouter.snapshot.paramMap.get("id")
    this.playerService.getPlayerById(this.playearId).subscribe(

      (data)=>{
        console.log("here reponse", data);
            console.log("here playreasTab", data.p);
            this.findeplayear = data.p
      }
    );

    
      // this.findeplayear = this.playears.find(
      // (obj: any) => { return obj.id == this.playearId}
      // )



  }

}
