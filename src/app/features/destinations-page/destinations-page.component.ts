import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeadComponent } from "../../shared/head/head.component";
import { FootComponent } from '../../shared/foot/foot.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../core/services/country.service';
import { catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-destinations-page',
  imports: [FootComponent,CommonModule, FormsModule, HeadComponent],
  templateUrl: './destinations-page.component.html',
  styleUrl: './destinations-page.component.css'
})
export class DestinationsPageComponent {
  searchCountry:string="";
  countryDetails:any=null;
  weather:any;
  filters = {
    maxCost: 10000,
    type: '',
    days: null
  };

  allPackages: any[] = [];
  filteredPackages: any[] = [];
constructor(private countryservice:CountryService, private route:ActivatedRoute){};


ngOnInit(): void {
  const countryName = this.route.snapshot.paramMap.get('country');

  const countries = this.countryservice.getCountriesSnapshot();

  if (countries.length > 0) {
    
    this.countryDetails = countries.find(c => c.name.toLowerCase() === countryName?.toLowerCase());
    this.allPackages = this.countryDetails?.packages || [];
    this.applyFilters();
  } else {
    this.countryservice.countries$.subscribe(data => {
      if (data.length > 0) {
        this.countryDetails = data.find(c => c.name.toLowerCase() === countryName?.toLowerCase());
        this.allPackages = this.countryDetails?.packages || [];
        this.applyFilters();
      }
    });

    this.countryservice.fetchCountries(); 
  };


  this.countryservice.getWeather(countryName).subscribe({
    next: (data) => {
      this.weather = data;
      console.log('Weather:', this.weather);
    },
    error: (err) => {
      console.error('Weather fetch failed', err);
    }
  });
}
ngDoCheck() {
  this.applyFilters();
}



applyFilters() {
  this.filteredPackages = this.allPackages.filter(pkg => {
    const matchesCost = pkg.amount <= this.filters.maxCost;
    const matchesType = this.filters.type ? pkg.type.toLowerCase() === this.filters.type.toLowerCase() : true;
    const matchesDays = this.filters.days ? pkg.numberOfDays == this.filters.days : true;

    return matchesCost && matchesType && matchesDays;
  });
}



} 

/*    fetchCountryDetails(name:string) {
    this.countryservice.getCountryDetails(this.searchCountry).subscribe((data) => {
      this.countryDetails = data;
      console.log(this.countryDetails);
      
      
    });
  }  */





  
