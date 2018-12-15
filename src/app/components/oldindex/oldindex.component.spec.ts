import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldindexComponent } from './oldindex.component';

describe('oldindexComponent', () => {
  let component: OldindexComponent;
  let fixture: ComponentFixture<OldindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
