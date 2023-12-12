import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTourneePageComponent } from './create-tournee-page.component';

describe('CreateTourneePageComponent', () => {
  let component: CreateTourneePageComponent;
  let fixture: ComponentFixture<CreateTourneePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTourneePageComponent]
    });
    fixture = TestBed.createComponent(CreateTourneePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
