import { createReducer, on } from '@ngrx/store';
import * as CountryActions from '../Action/countrydetails.action';
import { CountryDetail } from '../../Model/country-details.model';

export interface CountryState {
  countries: CountryDetail[];
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  error: null
};

export const countryDetailsReducer = createReducer(
  initialState,
  on(CountryActions.loadCountryDataSuccess, (state, { countries }) => ({
    ...state,
    countries,
    error: null
  })),
  on(CountryActions.loadCountryDataFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
