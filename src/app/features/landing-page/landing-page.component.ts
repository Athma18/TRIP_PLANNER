import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AnimatedImgComponent } from '../../shared/animated-img/animated-img.component';
import { HeadComponent } from "../../shared/head/head.component";
import { FootComponent } from '../../shared/foot/foot.component';

import {MatCardModule} from '@angular/material/card';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FeedbackModalComponent } from '../../shared/feedback-modal/feedback-modal.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../core/services/country.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';

@Component({
  selector: 'app-landing-page',
  imports: [ReviewCardComponent, CommonModule,FormsModule, MatDialogModule,MatCardModule,  FootComponent,HeadComponent,AnimatedImgComponent, MatSidenavModule, MatButtonModule, MatToolbarModule, MatListModule, MatDividerModule, HeadComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',

})
export class LandingPageComponent implements OnInit{
  showFiller = false;
  searchCountry:string="";
 countries:any=[];

  constructor(private router:Router, private countryService:CountryService,private cd: ChangeDetectorRef){};
  ngOnInit():void{
    console.log('ngOnInit called');

  this.countryService.fetchCountries();

  this.countryService.countries$.subscribe(data => {
    this.countries = data;
    console.log(this.countries);
  });
  }


    readonly dialog = inject(MatDialog);
  
    openDialog() {
      const dialogRef = this.dialog.open(FeedbackModalComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }


  


    search(){

      if(this.searchCountry.trim()){
          console.log(this.searchCountry);
       this.router.navigate(['/destination',this.searchCountry]);

       }
     
    }

    
  


}
