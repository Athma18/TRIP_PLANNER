/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { countryReducer } from './app/Store/Reducer/country.reducer';
import { CountryEffects } from './app/Store/Effects/country.effects';
import { provideRouter} from '@angular/router';
import { routes } from './app/app.routes';
import { PackagesEffects } from './app/Store/Effects/packages.effects';
import { packagesReducer } from './app/Store/Reducer/package.reducer';
import { CountryDetailsEffects } from './app/Store/Effects/countrydetails.effects';
import { countryDetailsReducer } from './app/Store/Reducer/countrydetails.reducer.ts';

//import { enableProdMode } from '@angular/core';
//enableProdMode();


//import { Clerk } from "@clerk/clerk-js";
//import { provideHttpClient } from '@angular/common/http';
/* const clerk = new Clerk("pk_test_ZGVlcC1waGVhc2FudC03Mi5jbGVyay5hY2NvdW50cy5kZXYk"); 
clerk.load();

export { clerk }; */
/* bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); */
  const scrollRestorationHandler = () => {
    window.history.scrollRestoration = 'manual'; 
    window.addEventListener('popstate', () => {
      window.scrollTo(0, 0);  
    });
  };
  
  const reducers = {
    country: countryReducer,
package:packagesReducer,
countryDetails:countryDetailsReducer
  };

  const effects = [CountryEffects,PackagesEffects,CountryDetailsEffects];

  
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), 
    
    provideAnimations(),
    provideStore(reducers),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(routes)
   
]
}).then(() => {
  scrollRestorationHandler();
})
.catch((err) => console.error(err));