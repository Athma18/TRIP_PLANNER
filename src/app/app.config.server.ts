import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideStore } from '@ngrx/store';
import { countryReducer } from './Store/Reducer/country.reducer';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { CountryEffects } from './Store/Effects/country.effects';
import { PackagesEffects } from './Store/Effects/packages.effects';
import { packagesReducer } from './Store/Reducer/package.reducer';
import { countryDetailsReducer } from './Store/Reducer/countrydetails.reducer.ts';
import { CountryDetailsEffects } from './Store/Effects/countrydetails.effects';


const serverConfig: ApplicationConfig = {

  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
   provideStore({ country: countryReducer , package:packagesReducer,countryDetails:countryDetailsReducer }),
   provideEffects(CountryEffects,PackagesEffects,CountryDetailsEffects)
   
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
