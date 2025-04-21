import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, tap } from 'rxjs';
import { Country } from '../../Model/country.models';
import { map } from 'rxjs';
import { Package } from '../../Model/package.model';
import { CountryDetail } from '../../Model/country-details.model';
@Injectable({

  providedIn: 'root'
})



export class CountryService {
private getcountryUrl="http://localhost:3000/countries";
private getpackagesUrl="http://localhost:3000/country-details";
private apiUrl="http://localhost:3000/packages"
  constructor( private http:HttpClient) { }
 
  fetchCountries(): Observable<Country[]> {
  return this.http.get<Country[]>(this.getcountryUrl).pipe(
    tap((data) => console.log('API Response:', data)) 
  );
} 

 getAllCountries(): Observable<CountryDetail[]> {
  return this.http.get<CountryDetail[]>(`${this.getpackagesUrl}`)
    
} 

search(term:string):Observable<any[]>{
return this.http.get<any[]>(`http://localhost:3000/countries?q=${term}`);
}

getWeather(countryName: string): Observable<any> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=0fb98fece26b5c523a9d05679134b10e&units=metric`;
  return this.http.get(url);
}; 
//fetch packages
getPackages(page: number, limit: number, filters: any = {}): Observable<Package[]> {
  const params:any = {
    page,
    limit,
  
  };
  if (filters) {
    if (filters.destination) params.destination = filters.destination;
    if (filters.type) params.type = filters.type;
    if (filters.price) params.price = filters.price;
    if (filters.duration) params.duration = filters.duration;
  }

  return this.http.post<Package[]>(`${this.apiUrl}`, params);
}



 


 
  };





 
  
 

