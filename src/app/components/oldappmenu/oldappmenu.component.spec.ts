import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldappmenuComponent } from './oldappmenu.component';

describe('OldappmenuComponent', () => {
  let component: OldappmenuComponent;
  let fixture: ComponentFixture<OldappmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldappmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldappmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
