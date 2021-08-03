import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsListComponent } from './interests-list.component';

describe('InterestsListComponent', () => {
  let component: InterestsListComponent;
  let fixture: ComponentFixture<InterestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
