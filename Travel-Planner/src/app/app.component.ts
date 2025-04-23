import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { FeaturesModule } from './features/features.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { loadCountries } from './Store/Action/country.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchCountries } from './Store/Selector/country.selectors';
import { Country } from './Model/country.models';

@Component({
  selector: 'app-root',
  imports: [ MatFormFieldModule,
    FeaturesModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,FeaturesModule,RouterOutlet,LucideAngularModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  


  constructor(private store: Store) {
  }

  
}
