import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userTypeSubject = new BehaviorSubject<string | null>(null);

  private apiUrl = 'http://localhost:3000/login';
  private regUrl = 'http://localhost:3000/register';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    const storedToken = this.getLocalStorageItem('token');
    const storedRole = this.getLocalStorageItem('role');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
    if (storedRole) {
      this.userTypeSubject.next(storedRole);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getLocalStorageItem(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  login(email: string, password: string, userType: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password, userType });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.regUrl, { username, email, password, userType: 'traveller' });
  }

  setToken(token: string): void {
    this.tokenSubject.next(token);
    this.setLocalStorageItem('token', token);
  }

  getToken(): string | null {
    const storedToken = this.getLocalStorageItem('token');
    if (storedToken && !this.tokenSubject.value) {
      this.tokenSubject.next(storedToken);
    }
    return this.tokenSubject.value;
  }

  setUserType(role: string): void {
    this.userTypeSubject.next(role);
    this.setLocalStorageItem('role', role);
  }

  getUserType(): string {
    const storedRole = this.getLocalStorageItem('role');
    if (storedRole && !this.userTypeSubject.value) {
      this.userTypeSubject.next(storedRole);
    }
    return this.userTypeSubject.value || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.tokenSubject.next(null);
    this.userTypeSubject.next(null);
    this.removeLocalStorageItem('token');
    this.removeLocalStorageItem('role');
    this.toastr.success('You have been logged out');
    this.router.navigate(['/']);
  }

  invalid(): void {
    this.toastr.error('Invalid credentials');
  }
}