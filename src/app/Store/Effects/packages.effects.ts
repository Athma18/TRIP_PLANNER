import { inject, Inject, Injectable } from '@angular/core';
import {  Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PackagesActions from '../Action/package.actions';
import { CountryService } from '../../core/services/country.service';

@Injectable()
export class PackagesEffects {

  constructor() {}
private actions$= inject(Actions);
private countryservice=inject(CountryService);
  loadPackages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PackagesActions.loadPackages),
      mergeMap(({page,limit,filters}) =>
        this.countryservice.getPackages(page, limit,filters).pipe(
          map(packages => PackagesActions.loadPackagesSuccess({ packages,page })),
          catchError(error => of(PackagesActions.loadPackagesFailure({ error })))
        )
      )
    )
  );

  loadMorePackages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PackagesActions.loadMorePackages),
      mergeMap(({ page, limit, filters }) =>
        this.countryservice.getPackages(page, limit, filters).pipe(
          map((packages) => PackagesActions.loadMorePackagesSuccess({ packages,page })),
          catchError((error) => of(PackagesActions.loadMorePackagesFailure({ error })))
        )
      )
    )
  );
}
