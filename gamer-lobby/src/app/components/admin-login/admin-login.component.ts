import { Component, OnInit } from '@angular/core';


import {Router} from '@angular/router';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router:Router ) { 
  }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigateByUrl('/admin-home');
    }else {
      alert("Invalid credentials");
    }
  }

}
