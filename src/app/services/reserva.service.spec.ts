import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ReservaService } from './reserva.service';
import { Alojamiento } from '../models/alojamiento.model';

describe('ReservaService', () => {

  let service: ReservaService;

  const mockAlojamiento: Alojamiento = {
    id: 1,
    nombre: 'Loft moderno en Chapinero',
    descripcion: 'Loft en Bogotá',
    ciudad: 'Bogotá',
    ubicacion: 'Chapinero, Bogotá',
    tipo: 'Apartamento',
    capacidad: 2,
    habitaciones: 1,
    camas: 1,
    banos: 1,
    precioNoche: 180000,
    tarifaLimpieza: 45000,
    calificacion: 4.8,
    activo: true,
    imagenPrincipal: 'assets/images/loft-bogota.jpg',
    imagenes: ['assets/images/loft-bogota.jpg'],
    servicios: ['Wi-Fi'],
    reglas: ['No fumar'],
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    service = new ReservaService();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe almacenar y recuperar una cotización activa', () => {
    service.guardarCotizacion({
      alojamiento: mockAlojamiento,
      fechaLlegada: '2026-11-01',
      fechaSalida: '2026-11-05',
      huespedes: 2,
      noches: 4,
      total: 792000,
    });

    expect(service.cotizacionActual).toBeTruthy();
    expect(service.cotizacionActual?.alojamiento.nombre).toBe('Loft moderno en Chapinero');
  });

  it('debe crear una reserva con estado inicial CONFIRMADA e ID autogenerado', () => {
    service.guardarCotizacion({
      alojamiento: mockAlojamiento,
      fechaLlegada: '2026-11-01',
      fechaSalida: '2026-11-05',
      huespedes: 2,
      noches: 4,
      total: 792000,
    });

    const reserva = service.agregarReserva('Carlos Gómez', 'carlos@ejemplo.com');

    expect(reserva).toBeTruthy();
    expect(reserva?.id).toBe(1);
    expect(reserva?.nombreHuesped).toBe('Carlos Gómez');
    expect(reserva?.correo).toBe('carlos@ejemplo.com');
    expect(reserva?.estado).toBe('CONFIRMADA');
    expect(reserva?.nombreAlojamiento).toBe('Loft moderno en Chapinero');
    expect(reserva?.ciudad).toBe('Bogotá');
    expect(service.getReservas().length).toBe(1);
    expect(service.cotizacionActual).toBeNull();
  });

  it('debe permitir cancelar una reserva y actualizar su estado a CANCELADA', () => {
    service.guardarCotizacion({
      alojamiento: mockAlojamiento,
      fechaLlegada: '2026-11-01',
      fechaSalida: '2026-11-05',
      huespedes: 2,
      noches: 4,
      total: 792000,
    });

    const reserva = service.agregarReserva('Ana López', 'ana@ejemplo.com');
    expect(reserva).toBeTruthy();

    const cancelada = service.cancelarReserva(reserva!.id);
    expect(cancelada).toBe(true);

    const lista = service.getReservas();
    expect(lista[0].estado).toBe('CANCELADA');
  });
});
