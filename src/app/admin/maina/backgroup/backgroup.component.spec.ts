import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroupComponent } from './backgroup.component';

describe('BackgroupComponent', () => {
  let component: BackgroupComponent;
  let fixture: ComponentFixture<BackgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
