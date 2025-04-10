import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './feedback-modal.component.html',
  styleUrl: './feedback-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackModalComponent {

}
