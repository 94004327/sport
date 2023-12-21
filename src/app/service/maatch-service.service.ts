import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaatchServiceService {
  // url = 'http://localhost:3000/locations';
  matchUrl:string="http://localhost:3000/matches"

  constructor(private httpClient:HttpClient) { }
  //methode de service pour envoyer l'obj tape par l'utilisateur a partie BackEnd .

  // addMatch function in your service
addMatch(obj) {
  return this.httpClient.post<{ msg: any }>(this.matchUrl, obj);
}
  // request=recuperer tous le tableau d'objet .
  getAllMatches(){
    return this.httpClient.get<{t:any}>(this.matchUrl);
  }
  // request=recuperer un seul objet .
  getMatchById(id){
    return this.httpClient.get<{findedMatch:any}>(`${this.matchUrl}/${id}`);
  }
  //request=modifier un objet
  updateMatch(obj){
    return this.httpClient.put<{msg:string}>(this.matchUrl,obj);
  }
  //request=supperimer un objet par id.
  deleteMatch(id){
    return this.httpClient.delete<{ message:any}>(`${this.matchUrl}/${id}`);
  }
  //request search match by score
  search(a:any){
    return this.httpClient.post<{m:any}>(`${this.matchUrl}/searchScore`, a);
  }
}
