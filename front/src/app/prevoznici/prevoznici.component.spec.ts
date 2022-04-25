import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevozniciComponent } from './prevoznici.component';

describe('PrevozniciComponent', () => {
  let component: PrevozniciComponent;
  let fixture: ComponentFixture<PrevozniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevozniciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevozniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
