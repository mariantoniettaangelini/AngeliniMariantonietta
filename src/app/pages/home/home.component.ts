import { Component, OnInit } from '@angular/core';
import { iMovie } from '../../models/i-movie';
import { MovieService } from '../../services/movie.service';
import { iFavMovie } from '../../models/i-fav-movie';
import { FavMovieService } from '../../services/fav-movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movie: iMovie[] = [];
  showAlert: boolean = false;
  userId: number = 1;

  constructor(
    private movieSvc: MovieService,
    private favMovieSvc: FavMovieService
  ) { }

  ngOnInit(): void {
    this.movieSvc.getAllMovies().subscribe(movie => {
      this.movie = movie;
      console.log(this.movie);
    });
  }

  addToFav(movie: iMovie): void {
    const film: Partial<iFavMovie> = {
      movie: movie,
      userId: this.userId
    };
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Per nascondere alert


    this.favMovieSvc.addToFavorites(film);
  }
}
