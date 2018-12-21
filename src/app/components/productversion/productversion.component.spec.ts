import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductversionComponent } from './productversion.component';

describe('ProductversionComponent', () => {
  let component: ProductversionComponent;
  let fixture: ComponentFixture<ProductversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
