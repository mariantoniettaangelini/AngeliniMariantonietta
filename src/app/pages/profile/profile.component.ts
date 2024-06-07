import { iUser } from './../../models/i-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iFavMovie } from '../../models/i-fav-movie';
import { FavMovieService } from '../../services/fav-movie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit  {

  user! : iUser;
  favoriteMovies: iFavMovie[] = [];

  constructor(
    private authSvc: AuthService,
    private favMovieSvc: FavMovieService
  ) {}


  ngOnInit(): void {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.user = user;
        // Fav utente
        this.favMovieSvc.getFavoriteMoviesByUserId(user.id);
        this.favMovieSvc.favoriteMovies$.subscribe(favMovies => {
          this.favoriteMovies = favMovies;
        });
      }
    });
  }

  logout():void {
    this.authSvc.logout();
  }
}
