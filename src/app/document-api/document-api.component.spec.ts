import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentApiComponent } from './document-api.component';

describe('DocumentApiComponent', () => {
  let component: DocumentApiComponent;
  let fixture: ComponentFixture<DocumentApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
