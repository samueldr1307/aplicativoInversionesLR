import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAlojamientos } from './listadoalojamientoscomponent';

describe('ListadoAlojamientos', () => {
  let component: ListadoAlojamientos;
  let fixture: ComponentFixture<ListadoAlojamientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoAlojamientos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoAlojamientos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
