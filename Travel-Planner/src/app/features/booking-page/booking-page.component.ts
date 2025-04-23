import { Component } from '@angular/core';
import { HeadComponent } from '../../shared/head/head.component';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Package } from '../../Model/package.model';
import { selectPackageById } from '../../Store/Selector/package.selectors';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../core/services/booking.service';
import { Router } from 'express';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent {
  bookingForm!: FormGroup;

   packageId:string=''
  packages$: Observable<Package[]>;


  constructor( private fb: FormBuilder,private route:ActivatedRoute,private store:Store,private bookingService: BookingService){
    
  }
ngOnInit(){

  this.bookingForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,15}$')]],
    cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]],
    cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    paymentDetails: ['', Validators.required]
  });


  this.packageId=this.route.snapshot.paramMap.get('id')
  console.log(this.packageId);
  this.packages$ = this.store.select(selectPackageById(this.packageId));
  
}


onSubmit(): void {
  if (this.bookingForm.valid) {
    console.log('Form Submitted:', this.bookingForm.value);
    this.bookingService.submitBooking(this.bookingForm.value).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);
        alert('Booking confirmed!');
        this.bookingForm.reset();
/*         this.router.navigate(['/landing'])
 */  } ,
  error: (error) => {
    console.error('Booking failed:', error);
    alert('Something went wrong. Please try again.');
  }
});
}
  
  else {
    this.bookingForm.markAllAsTouched();
  }
}

}
