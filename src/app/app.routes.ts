import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path:'',component:LoginComponent
    },
    {
        path:'landingpage',component:LandingPageComponent
    }
];
