import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodHTTPComponent } from './method-http.component';

describe('MethodHTTPComponent', () => {
  let component: MethodHTTPComponent;
  let fixture: ComponentFixture<MethodHTTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodHTTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodHTTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
