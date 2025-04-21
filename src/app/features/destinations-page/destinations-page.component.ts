import { Component, ElementRef, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeadComponent } from "../../shared/head/head.component";
import { FootComponent } from '../../shared/foot/foot.component';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../core/services/country.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { CountryDetail } from '../../Model/country-details.model';
import { Country } from '../../Model/country.models';
import { Package } from '../../Model/package.model';
import { loadPackages, updateFilters } from '../../Store/Action/package.actions';
import { selectError, selectIsLoading, selectPackages } from '../../Store/Selector/package.selectors';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { loadCountryData } from '../../Store/Action/countrydetails.action';
import { selectCountries } from '../../Store/Selector/countrydetails.selectors';

@Component({
  selector: 'app-destinations-page',
  imports: [InfiniteScrollModule, MatCardModule, FootComponent, CommonModule, FormsModule, HeadComponent],
  templateUrl: './destinations-page.component.html',
  styleUrl: './destinations-page.component.css',
})
export class DestinationsPageComponent implements OnInit {

  countries$: Observable<CountryDetail[]>;
  isScrolled = false;
  weatherData: any;
  weather: any;

  filterCriteria = {
    destination: '',
    price: '',
    type: '',
    duration: ''
  };

  countries: Country[] = [];
  packages: Package[] = [];

  page = 1;
  limit = 5;
  loading = false;
  hasMore = true;

  scrollDistance = 1;
  scrollUpDistance = 2;
  threshold = 120;
  destination: string = '';

  packages$: Observable<Package[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private countryservice: CountryService,
    private route: ActivatedRoute,
    private store: Store,
    private el: ElementRef
  ) {
    this.packages$ = this.store.select(selectPackages);
    this.loading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.countries$ = this.store.select(selectCountries);

  }
  filtersLoaded = false;

  ngOnInit(): void {
    let urlInitialized = false;
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
    if (changes['filterCriteria'] && changes['filterCriteria'].currentValue.destination) {
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
    this.page++;
    console.log('Fetching page:', this.page);
    this.store.dispatch(
      loadPackages({ page: this.page, limit: this.limit, filters: { ...this.filterCriteria } })
    );
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
}


