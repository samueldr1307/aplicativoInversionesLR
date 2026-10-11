import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alojamientocardcomponent } from './alojamientocardcomponent';

describe('Alojamientocardcomponent', () => {
  let component: Alojamientocardcomponent;
  let fixture: ComponentFixture<Alojamientocardcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Alojamientocardcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Alojamientocardcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
