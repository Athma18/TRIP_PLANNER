import { Component, HostListener, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeadComponent } from "../../shared/head/head.component";
import { FootComponent } from '../../shared/foot/foot.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { CountryDetail } from '../../Model/country-details.model';
import { Package } from '../../Model/package.model';
import { loadPackages, updateFilters } from '../../Store/Action/package.actions';
import { selectError, selectIsLoading, selectPackages } from '../../Store/Selector/package.selectors';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { loadCountryData } from '../../Store/Action/countrydetails.action';
import { selectCountries } from '../../Store/Selector/countrydetails.selectors';
@Component({
  selector: 'app-destinations-page',
  imports: [InfiniteScrollDirective, MatCardModule, FootComponent, CommonModule, FormsModule, HeadComponent],
  templateUrl: './destinations-page.component.html',
  styleUrl: './destinations-page.component.css',
})
export class DestinationsPageComponent implements OnInit {

  countries$: Observable<CountryDetail[]>;
  isScrolled = false;
  @HostListener('window:scroll', [])
onWindowScroll() {
  this.isScrolled = window.scrollY > 200;
}
  weatherData: any;
  weather: any;

  filterCriteria = {
    destination: '',
    price: '',
    type: '',
    duration: ''
  };

packages: Package[] = [];

  page = 1;
  limit = 5;
  loading = false;
  hasMore = true;

  scrollDistance = 1;
  destination: string = '';

  packages$: Observable<Package[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router:Router,
  ) {
    this.packages$ = this.store.select(selectPackages);
    this.loading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.countries$ = this.store.select(selectCountries);

  }

  ngOnInit(): void {
    this.loadInitialPackages();
    this.store.dispatch(loadCountryData());

    this.packages$.subscribe(packages => {
      if (packages.length < this.limit) {
        this.hasMore = false;
      } else {
        this.hasMore = true;
      }
    });

    this.route.queryParams.subscribe(params => {
      const destination = params['destination'];
      if (destination) {
        this.filterCriteria.destination = destination;  
        this.applyFilters();
      }
      });
  

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterCriteria'] ) {
      this.applyFilters();
      
    }
  }
  
  

  loadInitialPackages(): void {
    console.log("Initial dispatch without filters.");
    this.page = 1;
    this.hasMore = true;
    this.store.dispatch(
      loadPackages({ page: this.page, limit: this.limit, filters: { ...this.filterCriteria } })
    );
  }

  loadMorePackages():void {
    if (!this.hasMore) return;
    this.loading$.subscribe(isLoading => {
      if (!isLoading) {
        this.page++;
        console.log('Fetching page:', this.page);
        this.store.dispatch(
          loadPackages({ page: this.page, limit: this.limit, filters: { ...this.filterCriteria } })
        );
      }
    }).unsubscribe();
  }


  applyFilters(): void {
    console.log('Applying Filters:', this.filterCriteria);
    this.page = 1;
    this.packages = []; 
    this.hasMore = true;
    this.store.dispatch(updateFilters({ filters: { ...this.filterCriteria } }));

    this.store.dispatch(
      loadPackages({ page: this.page, limit: this.limit, filters: { ...this.filterCriteria } })
    );
  }

  resetFilters(): void {
    this.filterCriteria = {
      destination: '',
      price: '',
      type: '',
      duration: ''
    };
    this.applyFilters(); 
  }

  gotopackagedetails(id:number){
    this.router.navigate(['/packagedetails',id]);
    console.log(id);

  }
}


