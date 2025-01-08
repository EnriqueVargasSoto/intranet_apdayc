import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGeomapComponent } from './login-geomap.component';

describe('LoginGeomapComponent', () => {
  let component: LoginGeomapComponent;
  let fixture: ComponentFixture<LoginGeomapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginGeomapComponent]
    });
    fixture = TestBed.createComponent(LoginGeomapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
