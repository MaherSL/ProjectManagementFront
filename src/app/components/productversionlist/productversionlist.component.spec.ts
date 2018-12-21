import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductversionlistComponent } from './productversionlist.component';

describe('ProductversionlistComponent', () => {
  let component: ProductversionlistComponent;
  let fixture: ComponentFixture<ProductversionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductversionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductversionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
