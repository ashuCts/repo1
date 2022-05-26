import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from './User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userPassword: string;
  userLastName: string;
  userFirstName: string;
  userName: string;

  constructor(private router: Router, private service : UserService) { }

  ngOnInit(): void {
  }

  saveUser(){
    console.log(this.userFirstName)
    console.log(this.userLastName)
    let obj = new User(this.userName, this.userPassword, this.userFirstName, this.userLastName)
    this.service.registerNewUser(obj).subscribe((data)=>
    {
      console.log(data)
    })
  }

  homeNavigate(){
    this.router.navigate(['login']);
  }

  clearFields(){
    this.userName = null;
    this.userFirstName = null;
    this.userLastName = null;
    this.userPassword = null;
    
}




}
