import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissiontypeComponent } from './missiontype.component';

describe('MissiontypeComponent', () => {
  let component: MissiontypeComponent;
  let fixture: ComponentFixture<MissiontypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissiontypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
