import { Component, OnInit } from '@angular/core';
import { iUser } from '../../models/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  loggedUsers: iUser[] = [];

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.getAllUsers().subscribe(users => {
      this.loggedUsers = users;
      console.log(this.loggedUsers);
    });
  }
}
