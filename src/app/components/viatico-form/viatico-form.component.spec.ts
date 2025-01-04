import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViaticoFormComponent } from './viatico-form.component';

describe('ViaticoFormComponent', () => {
  let component: ViaticoFormComponent;
  let fixture: ComponentFixture<ViaticoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViaticoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViaticoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
