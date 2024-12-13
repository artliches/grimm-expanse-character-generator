import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrimmCardComponent } from './grimm-card.component';

describe('GrimmCardComponent', () => {
  let component: GrimmCardComponent;
  let fixture: ComponentFixture<GrimmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrimmCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrimmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
