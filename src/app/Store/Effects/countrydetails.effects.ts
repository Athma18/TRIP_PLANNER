import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CountryService } from '../../core/services/country.service';
import * as CountryActions from '../Action/countrydetails.action';
import { CountryDetail } from '../../Model/country-details.model';

@Injectable()
export class CountryDetailsEffects {

  constructor(
  
  ) {}
  private actions$=inject(Actions);
  private countryService=inject(CountryService);  

  loadCountryData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountryData),
      mergeMap(() =>
        this.countryService.getAllCountries().pipe(
          map((countries) => CountryActions.loadCountryDataSuccess({ countries })),
          catchError(error => of(CountryActions.loadCountryDataFailure({ error })))
        )
      )
    )
  );
}
