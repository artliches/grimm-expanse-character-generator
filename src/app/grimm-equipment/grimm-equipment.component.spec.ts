import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrimmEquipmentComponent } from './grimm-equipment.component';

describe('GrimmEquipmentComponent', () => {
  let component: GrimmEquipmentComponent;
  let fixture: ComponentFixture<GrimmEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrimmEquipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrimmEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
