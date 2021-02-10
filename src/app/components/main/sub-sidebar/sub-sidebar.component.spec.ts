import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSidebarComponent } from './sub-sidebar.component';

describe('SubSidebarComponent', () => {
  let component: SubSidebarComponent;
  let fixture: ComponentFixture<SubSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
