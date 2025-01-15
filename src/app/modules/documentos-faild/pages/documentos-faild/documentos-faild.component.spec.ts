import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosFaildComponent } from './documentos-faild.component';

describe('DocumentosFaildComponent', () => {
  let component: DocumentosFaildComponent;
  let fixture: ComponentFixture<DocumentosFaildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentosFaildComponent]
    });
    fixture = TestBed.createComponent(DocumentosFaildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
