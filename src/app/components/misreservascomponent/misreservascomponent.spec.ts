import { describe, it, expect, beforeEach } from 'vitest';
import { MisReservas } from './misreservascomponent';
import { ReservaService } from '../../services/reserva.service';
import { of } from 'rxjs';

describe('MisReservas', () => {
  let component: MisReservas;
  let reservaService: ReservaService;
  let mockRoute: any;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    reservaService = new ReservaService();
    mockRoute = {
      queryParams: of({}),
    };
    component = new MisReservas(reservaService, mockRoute);
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar lista vacía cuando no hay reservas', () => {
    component.ngOnInit();
    expect(component.reservas.length).toBe(0);
    expect(component.cantidadConfirmadas).toBe(0);
    expect(component.totalInversion).toBe(0);
  });

  it('debe listar reservas y calcular métricas correctamente', () => {
    reservaService.guardarCotizacion({
      alojamiento: { id: 1, nombre: 'Cabaña en Guatapé', ciudad: 'Guatapé', precioNoche: 350000 } as any,
      fechaLlegada: '2026-12-01',
      fechaSalida: '2026-12-03',
      huespedes: 2,
      noches: 2,
      total: 350000,
    });
    reservaService.agregarReserva('Juan Pérez', 'juan@ejemplo.com');

    component.ngOnInit();
    expect(component.reservas.length).toBe(1);
    expect(component.cantidadConfirmadas).toBe(1);
    expect(component.totalInversion).toBe(350000);
  });

  it('debe filtrar reservas por estado CONFIRMADA y CANCELADA', () => {
    reservaService.guardarCotizacion({
      alojamiento: { id: 1, nombre: 'Cabaña en Guatapé', ciudad: 'Guatapé', precioNoche: 350000 } as any,
      fechaLlegada: '2026-12-01',
      fechaSalida: '2026-12-03',
      huespedes: 2,
      noches: 2,
      total: 350000,
    });
    const reserva = reservaService.agregarReserva('Juan Pérez', 'juan@ejemplo.com');
    reservaService.cancelarReserva(reserva!.id);

    component.ngOnInit();
    expect(component.reservas.length).toBe(1);

    component.cambiarFiltro('CONFIRMADA');
    expect(component.reservasFiltradas.length).toBe(0);

    component.cambiarFiltro('CANCELADA');
    expect(component.reservasFiltradas.length).toBe(1);

    component.cambiarFiltro('TODAS');
    expect(component.reservasFiltradas.length).toBe(1);
  });
});
