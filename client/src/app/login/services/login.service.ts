import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  storeAuthHeader(auth: string) {
    localStorage.setItem('Authorization', auth);
  }

  getAuthHeader(): string {
    return localStorage.getItem('Authorization');
  }

  removeAuthHeader() {
    localStorage.removeItem('Authorization');
  }

  createBase64Auth(username: string, password: string): string {
    return `Basic ${btoa(`${username}:${password}`)}`;
  }
}
