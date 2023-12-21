import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private activatedRouter:ActivatedRoute,
    private usersService:UserService) { }
    
    usersId: any;
    findedUsers: any = {}; // Initialisez avec un objet vide
  
    ngOnInit() {
      this.usersId = this.activatedRouter.snapshot.paramMap.get('id');
      this.usersService.getUserById(this.usersId).subscribe(
          (data) => {
              console.log('here is user obj', data.findedUser);
              if (data.findedUser) {
                  this.findedUsers = data.findedUser;
              }
          },
          (error) => {
              console.error('Error', error);
          }
      );
  }
  
  }



