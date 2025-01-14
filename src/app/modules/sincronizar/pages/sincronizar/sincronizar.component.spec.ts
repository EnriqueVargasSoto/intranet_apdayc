import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SincronizarComponent } from './sincronizar.component';

describe('SincronizarComponent', () => {
  let component: SincronizarComponent;
  let fixture: ComponentFixture<SincronizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SincronizarComponent]
    });
    fixture = TestBed.createComponent(SincronizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
