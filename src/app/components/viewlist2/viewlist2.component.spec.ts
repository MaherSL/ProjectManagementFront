import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewlist2Component } from './viewlist2.component';

describe('Viewlist2Component', () => {
  let component: Viewlist2Component;
  let fixture: ComponentFixture<Viewlist2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viewlist2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viewlist2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
