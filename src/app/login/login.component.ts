import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { CookieService } from 'ngx-cookie-service/public-api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.loginService.login(email, password).subscribe({
      next: (response: any) => {
        if(response==true ){
          localStorage.setItem('Token', Math.random().toString());
          this.router.navigate(['i/home']);

        };
      },
      error: (error) => console.error('Error' + JSON.stringify(error)),

    });
  }

  saltarLog(){
    this.router.navigate(['i/home']);
  }
  // loginNew(form: NgForm) {
  //   localStorage.setItem('Token', Math.random().toString());
  //   this.router.navigate(['i/home']);
  // }
}
