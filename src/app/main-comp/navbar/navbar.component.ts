import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
active = 'top'

constructor(private authSvc:AuthService) {}

isLogged:boolean = false;

ngOnInit() {
  this.authSvc.isLogged$.subscribe(
    isLogged => {
      this.isLogged = isLogged;
    }
  )
}

}
