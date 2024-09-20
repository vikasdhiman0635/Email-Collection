import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeInputComponent } from './take-input.component';

describe('TakeInputComponent', () => {
  let component: TakeInputComponent;
  let fixture: ComponentFixture<TakeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
