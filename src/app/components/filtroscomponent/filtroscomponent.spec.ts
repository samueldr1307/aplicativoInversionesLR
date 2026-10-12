import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Filtros } from './filtroscomponent';

describe('Filtros', () => {
  let component: Filtros;
  let fixture: ComponentFixture<Filtros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Filtros],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Filtros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
