import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotFoundComponent } from './robot-found.component';

describe('RobotFoundComponent', () => {
  let component: RobotFoundComponent;
  let fixture: ComponentFixture<RobotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotFoundComponent]
    });
    fixture = TestBed.createComponent(RobotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
