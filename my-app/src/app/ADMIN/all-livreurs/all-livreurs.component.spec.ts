import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLivreursComponent } from './all-livreurs.component';

describe('AllLivreursComponent', () => {
  let component: AllLivreursComponent;
  let fixture: ComponentFixture<AllLivreursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllLivreursComponent]
    });
    fixture = TestBed.createComponent(AllLivreursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
