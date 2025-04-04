import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userTypeSubject= new BehaviorSubject<string | null >(null);

  constructor(private http:HttpClient , private router:Router, private toastr:ToastrService) { 
    const storedToken = localStorage.getItem('token'); 
    const storedRole = localStorage.getItem('role');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
    if (storedRole) {
      this.userTypeSubject.next(storedRole);
    }
  }
  private apiUrl = 'http://localhost:3000/login'; 
  private regUrl='http://localhost:3000/register'
//reqst api



  login(email:string,password:string,userType:string):Observable<any>{
    return this.http.post(this.apiUrl,{email,password,userType})
    
    }
    register(username: string, email: string, password: string): Observable<any> {
      return this.http.post(this.regUrl, { username, email, password,userType: "traveller" });
    }
    
    setToken(token:string):void{
      this.tokenSubject.next(token);
      if (typeof window !== 'undefined') {
      localStorage.setItem('token',token);
    }
  }
      getToken():string|null{
        if (typeof window !== 'undefined') {
   const storedToken=localStorage.getItem('token');
   if(storedToken && !this.tokenSubject.value){
    this.tokenSubject.next(storedToken);
   }
   return storedToken;   
  }
     return null; 
 
  }
  setUserType(role: string): void {
    this.userTypeSubject.next(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('role', role);
    }
  }
  getUserType(): string {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('role');
      if (storedRole && !this.userTypeSubject.value) {
        this.userTypeSubject.next(storedRole);
      }
    }
    return this.userTypeSubject.value || '';
  }


  isLoggedIn():boolean{
    
    return !!this.tokenSubject.value || !!localStorage.getItem('token');
  }


  isAuthenticated(){

    return this.isLoggedIn();

  }

 
  
  logout(): void {
    this.tokenSubject.next(null);
    this.userTypeSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/']);
  }
  invalid(){
    this.toastr.error('invalid credentials');

  }



}




