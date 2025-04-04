import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { adminGuard } from './guards/admin.guard';

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
    
    { path: '**', redirectTo: '' }
];
