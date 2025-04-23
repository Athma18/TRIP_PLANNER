import { CountryDetail } from "../Model/country-details.model";



export interface CountryState {
  countries: CountryDetail[];
  selectedCountry: string | null; 
  error: string | null;
}

export const initialCountryState: CountryState = {
  countries: [],
  
  selectedCountry: null,
  error: null,
};

