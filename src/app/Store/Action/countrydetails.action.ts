import { createAction, props } from '@ngrx/store';
import { CountryDetail } from '../../Model/country-details.model';

export const loadCountryData = createAction('[Country] Load Country Data');

export const loadCountryDataSuccess = createAction(
  '[Country] Load Country Data Success',
  props<{ countries: CountryDetail[] }>()
);

export const loadCountryDataFailure = createAction(
  '[Country] Load Country Data Failure',
  props<{ error: string }>()
);
