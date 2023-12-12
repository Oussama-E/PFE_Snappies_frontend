import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurPageComponent } from './livreur-page.component';

describe('LivreurPageComponent', () => {
  let component: LivreurPageComponent;
  let fixture: ComponentFixture<LivreurPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivreurPageComponent]
    });
    fixture = TestBed.createComponent(LivreurPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
