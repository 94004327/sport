import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl:string="http://localhost:3000/players"

  constructor(private httpClient:HttpClient) { 

  }
  addPlayer(obj){
    return this.httpClient.post<{msg:any}>(this.playerUrl,obj);
  }
  getAllPlayer(){
    return this.httpClient.get<{t:any}>(this.playerUrl);
  }
  getPlayerById(id){
    return this.httpClient.get<{p:any}>(`${this.playerUrl}/${id}`);
  }
  updatePlayer(obj){
    return this.httpClient.put<{msg:string}>(this.playerUrl,obj);
  }
  deletePlayer(id){
    return this.httpClient.delete<{message:any}> (`${this.playerUrl}/${id}`)
  }


  
}
