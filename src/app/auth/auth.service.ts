import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { iUser } from '../models/i-user';
import { iResponse } from '../models/i-response';
import { iAuthData } from '../models/i-auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  loginURL:string = 'http://localhost:3000/login';
  registerURL:string = 'http://localhost:3000/register';
  loggedUsersURL: string = 'http://localhost:3000/users';

  jwtHelper: JwtHelperService = new JwtHelperService();

  authSbj = new BehaviorSubject<null|iUser>(null);

  syncIsLogged:boolean = false;

  //Utente loggato
  user$ = this.authSbj.asObservable();
  isLogged$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncIsLogged = user)
  )


  // CHIAMATA PER REGISTRARE UTENTE
  registrazione(newUser:Partial<iUser>):Observable<iResponse> {
  return this.http.post<iResponse> (this.registerURL, newUser)
  }

  // CHIAMATA PER LOGGARE UTENTE
  login(authData:iAuthData):Observable<iResponse> {
    return this.http.post<iResponse> (this.loginURL, authData).pipe(
      tap(dati => {
        this.authSbj.next(dati.user),
        localStorage.setItem('accessData', JSON.stringify(dati))
      })
    )
  }

  // OTTENERE I DATI DELL'UTENTE LOGGATO
  getLoggedUser():iResponse|null {
    const getAccessData = localStorage.getItem('accessData');

    if(!getAccessData)
      return null; // Non esiste
    const accessData = JSON.parse(getAccessData)
      return accessData; // Esiste
  }

  //RECUPERA DATI PER RIMANERE LOGGATO
  loggedUser() {
    const accessData = this.getLoggedUser();
    if(!accessData)
      return; // Utente non loggato
    if(this.jwtHelper.isTokenExpired(accessData.token))
      return; // Token scaduto
    this.authSbj.next(accessData.user); // Utente loggato
    // Avvio timer per auto logout
    this.logoutAuto()
  }

  //  LOGOUT
  logout():void {
    this.authSbj.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth/login']);
  }

  // LOGOUT AUTOMATICO ALLO SCADERE DEL TOKEN
  logoutAuto():void {
    const accessData = this.getLoggedUser();
    if(!accessData)
      return; // Utente non loggato

    //Quando scade il token
    const expired = this.jwtHelper.getTokenExpirationDate(accessData.token) as Date;
    //Millisecondi mancanti alla scadenza
    const expiredMilliseconds = expired.getTime() - new Date().getTime();
    //Logout automatico
    setTimeout(this.logout, expiredMilliseconds)

}

  // LISTA UTENTI LOGGATI
  getAllUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.loggedUsersURL);
  }

}
