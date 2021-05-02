import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorVotesComponent } from './error-votes.component';

describe('ErrorVotesComponent', () => {
  let component: ErrorVotesComponent;
  let fixture: ComponentFixture<ErrorVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorVotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
