import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInterestComponent } from './create-interest.component';

describe('CreateInterestComponent', () => {
  let component: CreateInterestComponent;
  let fixture: ComponentFixture<CreateInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
