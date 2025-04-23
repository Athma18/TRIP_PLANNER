import { Component } from '@angular/core';
import { HeadComponent } from '../../shared/head/head.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageServiceService } from '../../core/services/package-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-details-page',
  imports: [HeadComponent,CommonModule],
  templateUrl: './package-details-page.component.html',
  styleUrl: './package-details-page.component.css'
})
export class PackageDetailsPageComponent {
  packageId!: string;
  packageDetails: any;
  constructor(
    private route: ActivatedRoute,
    private packageService: PackageServiceService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.packageId = this.route.snapshot.params['id'];
    
    this.packageService.getPackageById(this.packageId).subscribe(
      data => {
        this.packageDetails = data;
        console.log(this.packageDetails);
      },
      error => {
        console.error('Error fetching package:', error);
      }
    );
  }
  gotobookingpage(id:number){
    this.router.navigate(['/booking',id])
    console.log(id);
    
  }

}
