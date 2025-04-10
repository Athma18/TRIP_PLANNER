/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
//import { enableProdMode } from '@angular/core';
//enableProdMode();


//import { Clerk } from "@clerk/clerk-js";
//import { provideHttpClient } from '@angular/common/http';
/* const clerk = new Clerk("pk_test_ZGVlcC1waGVhc2FudC03Mi5jbGVyay5hY2NvdW50cy5kZXYk"); 
clerk.load();

export { clerk }; */
/* bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); */


  
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Preserve existing providers
    provideAnimations(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
}).catch((err) => console.error(err));