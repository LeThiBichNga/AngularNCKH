import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooteraComponent } from './footera.component';

describe('FooteraComponent', () => {
  let component: FooteraComponent;
  let fixture: ComponentFixture<FooteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
