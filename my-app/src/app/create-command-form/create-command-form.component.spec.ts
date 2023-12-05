import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommandFormComponent } from './create-command-form.component';

describe('CreateCommandFormComponent', () => {
  let component: CreateCommandFormComponent;
  let fixture: ComponentFixture<CreateCommandFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCommandFormComponent]
    });
    fixture = TestBed.createComponent(CreateCommandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
