import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filtroscomponent } from './filtroscomponent';

describe('Filtroscomponent', () => {
  let component: Filtroscomponent;
  let fixture: ComponentFixture<Filtroscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Filtroscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Filtroscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
