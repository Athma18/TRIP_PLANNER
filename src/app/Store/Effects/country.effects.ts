import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import * as CountryActions from '../Action/country.action';
@Injectable()
export class CountryEffects {
private actions$=inject(Actions);
private countryService=inject(CountryService);  
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countryService.fetchCountries().pipe(
          map((countries) => CountryActions.loadCountriesSuccess({ countries })),
          catchError((error) => of(CountryActions.loadCountriesFailure({ error })))
          
        )
      )
    )
  );
}
