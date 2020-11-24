import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchactivitiesComponent } from './researchactivities.component';

describe('ResearchactivitiesComponent', () => {
  let component: ResearchactivitiesComponent;
  let fixture: ComponentFixture<ResearchactivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchactivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
