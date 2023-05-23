import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsreLoginComponent } from './usre-login.component';

describe('UsreLoginComponent', () => {
  let component: UsreLoginComponent;
  let fixture: ComponentFixture<UsreLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsreLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
