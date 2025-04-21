import { createAction, props } from '@ngrx/store';
import { Country } from '../../Model/country.models';

export const loadCountries = createAction('[Country] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);

export const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: any }>()
  
);


export const setSelectedCountry = createAction(
  '[Country] Set Selected Country',
  props<{ countryId: string }>()  
);
