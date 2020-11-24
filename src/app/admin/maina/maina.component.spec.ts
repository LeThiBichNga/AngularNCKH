import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainaComponent } from './maina.component';

describe('MainaComponent', () => {
  let component: MainaComponent;
  let fixture: ComponentFixture<MainaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
