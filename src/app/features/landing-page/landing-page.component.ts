import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AnimatedImgComponent } from '../animated-img/animated-img.component';
import { HeadComponent } from "../head/head.component";
import { FootComponent } from '../foot/foot.component';

import {MatCardModule} from '@angular/material/card';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-landing-page',
  imports: [MatButtonModule, MatDialogModule,MatCardModule,  FootComponent,HeadComponent,AnimatedImgComponent, MatSidenavModule, MatButtonModule, MatToolbarModule, MatListModule, MatDividerModule, HeadComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  showFiller = false;


    readonly dialog = inject(MatDialog);
  
    openDialog() {
      const dialogRef = this.dialog.open(FeedbackModalComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  

  


}
