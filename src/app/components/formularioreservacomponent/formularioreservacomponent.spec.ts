import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Formularioreservacomponent } from './formularioreservacomponent';

describe('Formularioreservacomponent', () => {
  let component: Formularioreservacomponent;
  let fixture: ComponentFixture<Formularioreservacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Formularioreservacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Formularioreservacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
