import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../models/i-user';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss'
})
export class RegistrazioneComponent {

  constructor(
    private authSvc:AuthService,
    private router:Router
  ) {}

  newUser:Partial<iUser> = {}

  registrazione() {
    this.authSvc.registrazione(this.newUser).subscribe( () => {
      this.router.navigate(['/auth/login']) }
    )
  }

}
