import { Country } from "../Model/country.models";

export interface CountryState {
  countries: Country[];
  error: any;
}

export const initialState: CountryState = {
  countries: [],
  error: null
};
