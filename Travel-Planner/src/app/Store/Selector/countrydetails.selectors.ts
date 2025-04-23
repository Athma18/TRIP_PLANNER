import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from '../Reducer/country.reducer';

const getCountryState = createFeatureSelector<CountryState>('countryDetails');

export const selectCountries = createSelector(
  getCountryState,
  (state: CountryState) => state.countries
);
