import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionsComponent } from './ask-questions.component';

describe('AskQuestionsComponent', () => {
  let component: AskQuestionsComponent;
  let fixture: ComponentFixture<AskQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskQuestionsComponent]
    });
    fixture = TestBed.createComponent(AskQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
