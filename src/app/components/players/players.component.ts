import { Component, OnInit } from '@angular/core';
import { allPlayers } from 'src/app/Data/playersData';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  Players:any=[];

  constructor(private playerService:PlayerService) { }

  ngOnInit() {
this.playerService.getAllPlayer().subscribe(
  (data)=>{
    this.Players=data.t
  }

  
);
    // this.Players=allPlayers;


  }

}
