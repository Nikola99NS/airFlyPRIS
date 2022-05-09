import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevoznikComponent } from './prevoznik.component';

describe('PrevoznikComponent', () => {
  let component: PrevoznikComponent;
  let fixture: ComponentFixture<PrevoznikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevoznikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevoznikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
