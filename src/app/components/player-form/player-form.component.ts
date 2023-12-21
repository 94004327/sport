
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allPlayers } from 'src/app/Data/playersData';
import { PlayerService } from 'src/app/service/player.service';
import { TeamsService } from 'src/app/service/teams.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm: FormGroup;
  title: string = "Add Player";
  playearId: any;
  obj: any = {};
  playears: any = allPlayers;
  teams:any = [];
  teamsId: any;

  constructor(
    private formBuiler: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private teamsService: TeamsService) { }

  ngOnInit() {
    this.playerForm = this.formBuiler.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      age: [''],
      nbr: [''],
      position: [''],
    });
this.playearId = this.activatedRouter.snapshot.paramMap.get("id");
    if (this.playearId) {
      this.title = "Edit Player";
      this.playerService.getPlayerById(this.playearId).subscribe((data) => {
        this.obj = data.p;
      });
    }
    this.teamsService.getAllTeams().subscribe(
      (date) => {
        this.teams = date.t
      }
    )

  }


  editOrAdd() {
    this.obj.tId = this.teamsId;

    console.log("Player Object:", this.obj);
    console.log("Selected Team ID:", this.teamsId);

    if (this.playearId) {
      // edit
      this.playerService.updatePlayer(this.obj).subscribe(
        (data) =>{
          console.log('here edit playear', data);
          this.router.navigate(['admin']);
        }

      );
    }
    else {
      // ADD
      this.playerService.addPlayer(this.obj).subscribe(
        (data) => {
          console.log("Server response:", data);

          // Ajoutez ici une vérification pour détecter un message d'erreur
          if ( data.msg == 'Team Not Found') {
            console.error("Team Not Found");
            // Faites quelque chose pour gérer cette situation
          }
          else {
            // Traitement normal en cas de succès
            console.log("Player added successfully");
          }
        },
        (error) => {
          console.error("Error adding player:", error);
        }
      );

    }
  }

  selectTeam(evt: any) {
    this.teamsId = evt.target.value;
  }
}
