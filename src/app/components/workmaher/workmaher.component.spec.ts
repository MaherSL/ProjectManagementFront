import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkmaherComponent } from './workmaher.component';

describe('WorkmaherComponent', () => {
  let component: WorkmaherComponent;
  let fixture: ComponentFixture<WorkmaherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkmaherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkmaherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
