import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva.model';
import { Alojamiento } from '../models/alojamiento.model';

export interface CotizacionData {
  alojamiento: Alojamiento;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
  noches: number;
  total: number;
  subtotal?: number;
  tarifaLimpieza?: number;
  tarifaServicio?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private reservas: Reserva[] = [];
  public ultimaReserva: Reserva | null = null;

  cotizacionActual: CotizacionData | null = null;

  constructor() {
    this.cargarReservasDesdeStorage();
    this.cargarCotizacionDesdeStorage();
  }

  private cargarReservasDesdeStorage(): void {
    try {
      const guardadas = localStorage.getItem('reservas');
      if (guardadas) {
        const parsed = JSON.parse(guardadas);
        this.reservas = Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error('Error al cargar reservas de localStorage', e);
      this.reservas = [];
    }
  }

  private cargarCotizacionDesdeStorage(): void {
    try {
      const cotizacionGuardada = sessionStorage.getItem('cotizacion_actual');
      if (cotizacionGuardada) {
        this.cotizacionActual = JSON.parse(cotizacionGuardada);
      }
    } catch (e) {
      console.error('Error al recuperar cotización de sessionStorage', e);
      this.cotizacionActual = null;
    }
  }

  guardarCotizacion(cotizacion: any): void {
    this.cotizacionActual = cotizacion;
    try {
      sessionStorage.setItem('cotizacion_actual', JSON.stringify(cotizacion));
    } catch (e) {
      console.error('Error al persistir cotización en sessionStorage', e);
    }
  }

  limpiarCotizacion(): void {
    this.cotizacionActual = null;
    try {
      sessionStorage.removeItem('cotizacion_actual');
    } catch (e) {
      console.error('Error al limpiar cotización de sessionStorage', e);
    }
  }

  agregarReserva(nombre: string, correo: string): Reserva | null {
    if (!this.cotizacionActual) return null;

    const c = this.cotizacionActual;
    const maxId = this.reservas.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0);
    const nextId = maxId + 1;

    const nuevaReserva: Reserva = {
      id: nextId,
      alojamientoId: c.alojamiento.id,
      nombreAlojamiento: c.alojamiento.nombre,
      ciudad: c.alojamiento.ciudad,
      fechaLlegada: c.fechaLlegada,
      fechaSalida: c.fechaSalida,
      huespedes: c.huespedes,
      noches: c.noches,
      total: c.total,
      nombreHuesped: nombre.trim(),
      correo: correo.trim(),
      estado: 'CONFIRMADA',
      imagenAlojamiento: c.alojamiento.imagenPrincipal,
    };

    this.reservas.unshift(nuevaReserva);
    try {
      localStorage.setItem('reservas', JSON.stringify(this.reservas));
    } catch (e) {
      console.error('Error al guardar reserva en localStorage', e);
    }

    this.ultimaReserva = nuevaReserva;
    this.limpiarCotizacion();

    return nuevaReserva;
  }

  getReservas(): Reserva[] {
    return [...this.reservas];
  }

  cancelarReserva(id: number): boolean {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva && reserva.estado !== 'CANCELADA') {
      reserva.estado = 'CANCELADA';
      try {
        localStorage.setItem('reservas', JSON.stringify(this.reservas));
      } catch (e) {
        console.error('Error al actualizar estado en localStorage', e);
      }
      return true;
    }
    return false;
  }

  eliminarReserva(id: number): boolean {
    const longitudPrevia = this.reservas.length;
    this.reservas = this.reservas.filter(r => r.id !== id);
    if (this.reservas.length !== longitudPrevia) {
      try {
        localStorage.setItem('reservas', JSON.stringify(this.reservas));
      } catch (e) {
        console.error('Error al eliminar reserva de localStorage', e);
      }
      return true;
    }
    return false;
  }

  obtenerUltimaReserva(): Reserva | null {
    return this.ultimaReserva;
  }
}

