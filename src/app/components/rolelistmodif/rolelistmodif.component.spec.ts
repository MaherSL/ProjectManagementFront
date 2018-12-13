import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolelistmodifComponent } from './rolelistmodif.component';

describe('RolelistmodifComponent', () => {
  let component: RolelistmodifComponent;
  let fixture: ComponentFixture<RolelistmodifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolelistmodifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolelistmodifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
