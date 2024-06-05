import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostadorComponent } from './apostador.component';

describe('ApostadorComponent', () => {
  let component: ApostadorComponent;
  let fixture: ComponentFixture<ApostadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApostadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApostadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
