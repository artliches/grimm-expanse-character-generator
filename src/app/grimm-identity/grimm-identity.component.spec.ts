import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrimmIdentityComponent } from './grimm-identity.component';

describe('GrimmIdentityComponent', () => {
  let component: GrimmIdentityComponent;
  let fixture: ComponentFixture<GrimmIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrimmIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrimmIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
