import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iAuthData } from '../../models/i-auth-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authSvc:AuthService,
    private router:Router
  ) {}

  authData: iAuthData = {
    email: '',
    password: ''
  }

  login():void {
    this.authSvc.login(this.authData)
      .subscribe( () => {
        this.router.navigate(['/'])
    })
  }

}
