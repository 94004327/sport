import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
 ;
  teamsUrl:string="http://localhost:3000/teams"


  constructor(private httpClient:HttpClient) { }
      // addTeams function in your service
addTeams(obj) {
  return this.httpClient.post<{ msg: any }>(this.teamsUrl, obj);
}
//request=modifier un objet
updatTeams(obj){
  return this.httpClient.put<{msg:string}>(this.teamsUrl,obj);
}
// request=recuperer tous le tableau d'objet .
getAllTeams(){
  return this.httpClient.get<{t:any}>(this.teamsUrl);
}
getTeamById(id){
  return this.httpClient.get<{Team:any}>(`${this.teamsUrl}/${id}`);
}
//request=supperimer un objet par id.
deleteTeams(id){
  return this.httpClient.delete<{ message:any}>(`${this.teamsUrl}/${id}`);
}
  
  
}
