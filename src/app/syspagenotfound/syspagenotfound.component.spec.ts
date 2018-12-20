import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyspagenotfoundComponent } from './syspagenotfound.component';

describe('SyspagenotfoundComponent', () => {
  let component: SyspagenotfoundComponent;
  let fixture: ComponentFixture<SyspagenotfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyspagenotfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyspagenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
