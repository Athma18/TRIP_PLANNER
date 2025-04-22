import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageServiceService {

  constructor(private http:HttpClient) { }
  getPackageById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/packages/${id}`);
  }

  
}
