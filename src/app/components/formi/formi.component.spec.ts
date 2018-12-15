import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormiComponent } from './formi.component';

describe('FormiComponent', () => {
  let component: FormiComponent;
  let fixture: ComponentFixture<FormiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
