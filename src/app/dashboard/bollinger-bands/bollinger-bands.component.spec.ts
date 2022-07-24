import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BollingerBandsComponent } from './bollinger-bands.component';

describe('BollingerBandsComponent', () => {
  let component: BollingerBandsComponent;
  let fixture: ComponentFixture<BollingerBandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BollingerBandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BollingerBandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
