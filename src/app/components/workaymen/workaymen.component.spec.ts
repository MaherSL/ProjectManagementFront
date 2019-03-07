import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkaymenComponent } from './workaymen.component';

describe('WorkaymenComponent', () => {
  let component: WorkaymenComponent;
  let fixture: ComponentFixture<WorkaymenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkaymenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkaymenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
