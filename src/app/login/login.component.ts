import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService, private router : Router) { }
password;
email;
  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.email, this.password);
    this.email = this.password = '';    
  }

}
