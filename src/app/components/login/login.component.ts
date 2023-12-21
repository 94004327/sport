import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  title: string = "Login";
  errorMsg: string = ""

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&].{5,10}')]]
    });
  }

  login() {

    this.userService.login(this.loginForm.value).subscribe(
      (data) => {

        console.log('here is data', data);
        if (data.token) {
          sessionStorage.setItem("jwt",data.token)
          let user:any =this.decodeToken(data.token);
          if (user.role=="admin") {
            this.router.navigate(["admin"]);
            
          }else{
            this.router.navigate([""]);
          }
         
        }
        else {
          this.errorMsg = "please check email/pwd"
        }

      }
    );
  }


  
  decodeToken(token:string){
    return jwt_decode(token);
  }
}



