import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrimmAbilitiesComponent } from './grimm-abilities.component';

describe('GrimmAbilitiesComponent', () => {
  let component: GrimmAbilitiesComponent;
  let fixture: ComponentFixture<GrimmAbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrimmAbilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrimmAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
