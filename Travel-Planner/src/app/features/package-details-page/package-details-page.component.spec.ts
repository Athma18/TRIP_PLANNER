import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailsPageComponent } from './package-details-page.component';

describe('PackageDetailsPageComponent', () => {
  let component: PackageDetailsPageComponent;
  let fixture: ComponentFixture<PackageDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
