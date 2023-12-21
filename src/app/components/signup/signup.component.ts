import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  imagePreview:any;

  constructor(private x: FormBuilder,private userService:UserService,
    private router:Router) {


  }

  ngOnInit() {
    this.signupForm = this.x.group({
      firstName: ['',[Validators.required,Validators.minLength(3)]],
      lastName: ['',[Validators.required,Validators.minLength(4)]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,10}$/)]],
      tel: [''],
      img:[''],
      


    })
  }
  signup() {
    console.log("Displaying content", this.signupForm.value);
  
    // Determine the role based on the current URL
    
    // if (this.router.url === "/signup") {
    //   this.signupForm.value.role = 'user';
    // } else {
      
    //   this.signupForm.value.role = 'admin';
    // }
    this.router.url == "/signup" ? (this.signupForm.value.role = 'user')
    : (this.signupForm.value.role = 'admin')

    this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe(
      (data) => {
        console.log('Here is the data', data);
        
      },
     
    );
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

}
