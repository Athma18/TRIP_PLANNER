import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { adminGuard } from './core/guards/admin.guard';
import { DestinationsPageComponent } from './features/destinations-page/destinations-page.component';
import { PackageDetailsPageComponent } from './features/package-details-page/package-details-page.component';

export const routes: Routes = [
    {
        path:'',component:LoginComponent ,canActivate:[loginGuard]
    },
    {
        path:'Landing',component:LandingPageComponent , canActivate:[authGuard]
    },
   {
    path:'Admin',component:AdminComponent, canActivate:[adminGuard]
   },
   {
    path:'destination/:country',component:DestinationsPageComponent
   },
   {
    path:'packagedetails',component:PackageDetailsPageComponent
   },
    
    { path: '**', redirectTo: '' }
];
