import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostadorViewComponent } from './apostador-view.component';

describe('ApostadorViewComponent', () => {
  let component: ApostadorViewComponent;
  let fixture: ComponentFixture<ApostadorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApostadorViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApostadorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
