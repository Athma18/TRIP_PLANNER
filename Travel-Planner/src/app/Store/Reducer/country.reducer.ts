import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './../Action/country.action';
import { Country } from '../../Model/country.models';


export interface CountryState {
  countries: Country[];
  error: any;
  selectedCountryId:string|null;
}

export const initialState: CountryState = {
  countries: [],
  error: null,
  selectedCountryId:null
};
 
export const countryReducer = createReducer(
  initialState,
  on(CountryActions.loadCountries, (state) => ({ ...state })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({ ...state, countries })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({ ...state, error })),
  on(CountryActions.setSelectedCountry, (state, { countryId }) => ({
    ...state,
    selectedCountryId: countryId,
  }))
);
