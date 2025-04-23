import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head',
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatListModule, MatDividerModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
  constructor(private authService:AuthService , private router:Router){}

  isSidebarOpen = false;
isNavbarCollapsed=false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout(){
    this.authService.logout();
  }
  
  

}
