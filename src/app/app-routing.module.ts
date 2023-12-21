import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { AddTeamComponent } from './components/add-team/add-team.component';

import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { SearchMatchComponent } from './components/search-match/search-match.component';
import { PlayearInfoComponent } from './components/playear-info/playear-info.component';
import { TeamsInfoComponent } from './components/teams-info/teams-info.component';
import { AddStaduimComponent } from './components/add-staduim/add-staduim.component';
import { SearchMatchByScoreComponent } from './components/search-match-by-score/search-match-by-score.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WeatherComponent } from './components/weather/weather.component';


const routes: Routes = [
{  path:"",component:HomeComponent},
{  path:"addStaduim",component:AddStaduimComponent},
{path:"signup",component:SignupComponent},
{path:"signupAdmin",component:SignupComponent},
{  path:"login",component:LoginComponent},
{  path:"matchForm",component:MatchFormComponent},
{  path:"playerForm",component:PlayerFormComponent},
{  path:"playerEdit/:id",component:PlayerFormComponent},
{  path:"playerAdd",component:PlayerFormComponent},
{  path:"addTeam",component:AddTeamComponent},

{  path:"EditTeam/:id",component:AddTeamComponent},
{  path:"allMAtches",component:MatchesComponent},
{  path:"allMAtches/search",component:MatchesComponent},
{  path:"allPlayrs",component:PlayersComponent},
{  path:"matchInfo/:id",component:MatchInfoComponent},
{  path:"allteams",component:TeamsComponent},
{  path:"admin",component:AdminComponent},
{  path:"matchEdit/:id",component:MatchFormComponent},
{  path:"matchAdd",component:MatchFormComponent},
{  path:"search",component:SearchMatchComponent},
{  path:"playearInfo/:id",component:PlayearInfoComponent},
{  path:"weather",component:WeatherComponent},


{  path:"teamsInfo/:id",component:TeamsInfoComponent},
{  path:"searchScore",component:SearchMatchByScoreComponent},
{  path:"profile/:id",component:ProfileComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
