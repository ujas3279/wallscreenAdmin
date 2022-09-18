import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(token: string): void {
    // setToken will receive token and will store token inside localstorage
    localStorage.setItem('token', token);
  }

  // will return token from localstorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // it will check whether token is present or not in localstorage
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // removing token from localstorage and navigate to login page
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  // receiving an object(email, and pwd) and returning observable
  login({ name, password }: any): Observable<any> {
    // here, we are doing static check
    if (name === 'Admin' && password === 'Admin@123') {
      // storing a random token inside localstorage and returning one observable variable
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'Ujas Patel', email: 'yash@frost'});
    }
    // if email and pwd not match, we throw error
    return throwError(new Error('Failed to login'))
  }
}
