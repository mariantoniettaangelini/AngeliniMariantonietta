import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iMovie } from '../models/i-movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiURL:string = 'http://localhost:3000/movies-popular'

  constructor(private http:HttpClient) {}



  // TROVA FILM + DETTAGLI
  getAllMovies() {
    return this.http.get<iMovie[]>(this.apiURL)
  }

  getMovieDetailsById(id:number) {
    return this.http.get<iMovie>(`${this.apiURL}/${id}`)
  }
}
