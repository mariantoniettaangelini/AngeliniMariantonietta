import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFavMovie } from '../models/i-fav-movie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavMovieService {

  private favMovieSbj = new BehaviorSubject<iFavMovie[]>([]);
  favoriteMovies$ = this.favMovieSbj.asObservable();

  constructor(private http: HttpClient) { }

  apiURL: string = 'http://localhost:3000/favorites';

  // RECUPERO FILM PREFERITI PER USER ID
  getFavoriteMoviesByUserId(userId: number) {
    const url = `${this.apiURL}?userId=${userId}`;
    this.http.get<iFavMovie[]>(url).subscribe(favMovies => {
      this.favMovieSbj.next(favMovies);
    });
  }

  // AGGIUNGI FILM AI PREFERITI
  addToFavorites(favMovie: Partial<iFavMovie>) {
    return this.http.post<iFavMovie>(this.apiURL, favMovie).subscribe(() => {
      this.getFavoriteMoviesByUserId(favMovie.userId!);
    });
  }
}
