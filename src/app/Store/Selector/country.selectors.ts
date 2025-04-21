import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from '../../State/country.state';

export const selectCountryState = createFeatureSelector<CountryState>('country');

export const fetchCountries = createSelector(
  selectCountryState,
  (state: CountryState) => state?.countries ??[]
);

export const selectCountryById = (id: number) =>
  createSelector(fetchCountries, (countries) =>
    countries.find((country) => country.id === id)
  );