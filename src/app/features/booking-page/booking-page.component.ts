import { Component } from '@angular/core';
import { HeadComponent } from '../../shared/head/head.component';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Package } from '../../Model/package.model';
import { selectPackageById, selectPackages } from '../../Store/Selector/package.selectors';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-booking-page',
  imports: [],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent {
   packageId:string=''
  packages$: Observable<Package[]>;


  constructor(private route:ActivatedRoute,private store:Store){
    
  }
ngOnInit(){
  this.packageId=this.route.snapshot.paramMap.get('id')
  console.log(this.packageId);
  this.packages$ = this.store.select(selectPackageById(this.packageId));
   


  
}

}
