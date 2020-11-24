import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypenewsComponent } from './typenews.component';

describe('TypenewsComponent', () => {
  let component: TypenewsComponent;
  let fixture: ComponentFixture<TypenewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypenewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
