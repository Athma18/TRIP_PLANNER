import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { FeaturesModule } from './features/features.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,FeaturesModule,RouterOutlet,LucideAngularModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TravelPlanner';
}
