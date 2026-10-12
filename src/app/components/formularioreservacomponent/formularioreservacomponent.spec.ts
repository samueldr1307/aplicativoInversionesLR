import { describe, it, expect, beforeEach } from 'vitest';
import { Formularioreservacomponent } from './formularioreservacomponent';
import { ReservaService } from '../../services/reserva.service';

describe('Formularioreservacomponent', () => {
  let component: Formularioreservacomponent;
  let reservaService: ReservaService;
  let mockRouter: any;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    reservaService = new ReservaService();
    mockRouter = {
      navigate: () => Promise.resolve(true),
    };
    component = new Formularioreservacomponent(reservaService, mockRouter);
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe validar correos electronicos correctamente', () => {
    expect(component.correoValido('usuario@ejemplo.com')).toBe(true);
    expect(component.correoValido('nombre.apellido@dominio.co')).toBe(true);
    expect(component.correoValido('correo-invalido')).toBe(false);
    expect(component.correoValido('correo@invalido')).toBe(false);
    expect(component.correoValido('')).toBe(false);
  });

  it('debe mostrar error si se intenta reservar sin cotización activa', () => {
    component.cotizacion = null;
    component.confirmarReserva();
    expect(component.mensajeError).toContain('No hay ninguna cotización activa');
  });

  it('debe requerir nombre completo mayor o igual a 3 caracteres', () => {
    component.cotizacion = {
      alojamiento: { id: 1, nombre: 'Test', precioNoche: 100000, tarifaLimpieza: 20000 } as any,
      fechaLlegada: '2026-11-01',
      fechaSalida: '2026-11-05',
      huespedes: 2,
      noches: 4,
      total: 450000,
    };
    component.nombre = 'Al';
    component.correo = 'al@correo.com';
    component.confirmarReserva();
    expect(component.mensajeError).toContain('al menos 3 caracteres');
  });

  it('debe requerir un correo válido para reservar', () => {
    component.cotizacion = {
      alojamiento: { id: 1, nombre: 'Test', precioNoche: 100000, tarifaLimpieza: 20000 } as any,
      fechaLlegada: '2026-11-01',
      fechaSalida: '2026-11-05',
      huespedes: 2,
      noches: 4,
      total: 450000,
    };
    component.nombre = 'Alejandro Pérez';
    component.correo = 'correo-no-valido';
    component.confirmarReserva();
    expect(component.mensajeError).toContain('formato válido');
  });

  it('debe llamar al servicio y navegar cuando los datos son válidos', () => {
    let rutaNavegada: any = null;
    let queryParamsNavegados: any = null;

    mockRouter.navigate = (ruta: any[], opts?: any) => {
      rutaNavegada = ruta;
      queryParamsNavegados = opts?.queryParams;
      return Promise.resolve(true);
    };

    reservaService.guardarCotizacion({
      alojamiento: { id: 1, nombre: 'Loft moderno', precioNoche: 100000, tarifaLimpieza: 20000 } as any,
      fechaLlegada: '2026-11-01',
      fechaSalida: '2026-11-05',
      huespedes: 2,
      noches: 4,
      total: 450000,
    });

    component.ngOnInit();
    component.nombre = 'Alejandro Pérez';
    component.correo = 'alejandro@ejemplo.com';
    component.confirmarReserva();

    expect(rutaNavegada).toEqual(['/mis-reservas']);
    expect(queryParamsNavegados?.nueva).toBe(1);
    expect(reservaService.getReservas().length).toBe(1);
  });
});
