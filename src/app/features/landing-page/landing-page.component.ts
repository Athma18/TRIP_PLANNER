import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AnimatedImgComponent } from '../../shared/animated-img/animated-img.component';
import { HeadComponent } from "../../shared/head/head.component";
import { FootComponent } from '../../shared/foot/foot.component';
import {MatCardModule} from '@angular/material/card';
import { Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FeedbackModalComponent } from '../../shared/feedback-modal/feedback-modal.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../core/services/country.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';
import { Store } from '@ngrx/store';
import { fetchCountries } from '../../Store/Selector/country.selectors';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Country } from '../../Model/country.models';
import { loadCountries } from '../../Store/Action/country.action';
import {  ElementRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing-page',
  imports: [ReviewCardComponent, CommonModule,FormsModule, MatDialogModule,MatCardModule,  FootComponent,HeadComponent,AnimatedImgComponent, MatSidenavModule, MatButtonModule, MatToolbarModule, MatListModule, MatDividerModule, HeadComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',

})
export class LandingPageComponent implements OnInit{
  showFiller = false;
  searchCountry: string = '';
  results: any[] = [];
  selectedCountry: any = null;
    allCountries: any[] = [];
 countries$: Observable<Country[]>;
  filteredSuggestions: any[] = [];
  showSuggestions = false;
  private searchTerm=new Subject<string>();


  constructor(private router:Router,private authService:AuthService, private countryService:CountryService,private cd: ChangeDetectorRef ,private store:Store, private elRef: ElementRef){
     this.countries$ = this.store.select(fetchCountries); 


  };
  

  asyncsearch(event:Event){

    const input=event.target as HTMLInputElement;
    const value=input.value;

   this.searchTerm.next(value);


  }

 


  ngOnInit(): void {

  
      const token = localStorage.getItem('token');
      if (token) {
        this.authService.isLoggedIn(); 
      } else {
        this.router.navigate(['/login']);
      }
 

    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term=>this.countryService.search(term))

     ).subscribe(data=>{
      this.results=data;
     }) 
  }
 

    readonly dialog = inject(MatDialog);
  
    openDialog() {
      const dialogRef = this.dialog.open(FeedbackModalComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
selectCountry(country:any):void{
  this.selectedCountry = country;
  this.searchCountry = country.name; 
  this.results = [];    
  this.showSuggestions = false;    
}

   search(): void {
    let destination = this.selectedCountry ? this.selectedCountry.name : this.searchCountry.trim();

      if (this.searchCountry.trim()) {
        this.router.navigate(['/destination'],{
          queryParams: { destination: destination }

        });
      }
      else {
        console.error('No country selected or ID is missing');
      }
    }

  
    }

  
  



