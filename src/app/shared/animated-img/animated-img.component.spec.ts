import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedImgComponent } from './animated-img.component';

describe('AnimatedImgComponent', () => {
  let component: AnimatedImgComponent;
  let fixture: ComponentFixture<AnimatedImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
