/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
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
    provideAnimations(), // ✅ Enables animations
  ]
}).catch((err) => console.error(err));