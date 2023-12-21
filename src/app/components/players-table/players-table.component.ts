import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  playears:any=[];

  constructor(private router :Router ,
    private PlayerService:PlayerService) { }

  ngOnInit() {
  this.PlayerService.getAllPlayer().subscribe(
    (data) => {
        console.log("here response", data);
        this.playears = data.t;

    }
);




  
    
  }
  goToDisplay(id:number){
    this.router.navigate ([`playearInfo/${id}`])

  }
  EDIT(id:number){
    this.router.navigate ([`playerEdit/${id}`]) 
  }
  deletePlayerById(id:number){
    this.PlayerService.deletePlayer(id).subscribe(
      (data)=>{
        console.log('here after delete', data.message);
        this.PlayerService.getAllPlayer().subscribe(
          (data)=>{
            this.playears=data.t;
          }
        )
        
      }
    );
  }

}
