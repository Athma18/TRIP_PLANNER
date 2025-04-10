import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
  
@Injectable({

  providedIn: 'root'
})



export class CountryService {
  private apiUrl = 'http://localhost:4000/countries'; 
private getcountryUrl="http://localhost:4000/countries";
private apiKey="0fb98fece26b5c523a9d05679134b10e";
private weatherurl="https://home.openweathermap.org";
  constructor( private http:HttpClient) { }
 
  private countriesSubject = new BehaviorSubject<any[]>([]);
  public countries$ = this.countriesSubject.asObservable();
  fetchCountries(): void {
    this.http.get<any[]>(this.getcountryUrl).subscribe(data => {
      this.countriesSubject.next(data);
    });
  }

  getCountriesSnapshot(): any[] {
    return this.countriesSubject.getValue();
  }
  

   getCountryDetails(countryName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${countryName}`).pipe(

    )
 
  };




   getWeather(countryName: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=0fb98fece26b5c523a9d05679134b10e&units=metric`;
    return this.http.get(url);
  };
/*
  getweather(city:string):Observable<any>{

    return this.http.get<any>(`${this.weatherurl}?q=${city}&appid=${this.apiKey}`);

  };
 */
  
 

}
