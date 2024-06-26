import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortearComponent } from './sortear.component';

describe('SortearComponent', () => {
  let component: SortearComponent;
  let fixture: ComponentFixture<SortearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
