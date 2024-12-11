import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrimmJobComponent } from './grimm-job.component';

describe('GrimmJobComponent', () => {
  let component: GrimmJobComponent;
  let fixture: ComponentFixture<GrimmJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrimmJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrimmJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
