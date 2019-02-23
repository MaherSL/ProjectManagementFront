/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectmComponent } from './selectm.component';

describe('SelectmComponent', () => {
  let component: SelectmComponent;
  let fixture: ComponentFixture<SelectmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/




import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectmComponent } from './selectm.component';

describe('SelectmComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SelectmComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SelectmComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ProjectManagement'`, () => {
    const fixture = TestBed.createComponent(SelectmComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ProjectManagement');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(SelectmComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ProjectManagement!');
  });
});
