import { Injectable } from '@angular/core';
import { ReservaModel } from '../models/reserva.model';
import { AlojamientoModel } from '../models/alojamiento.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private reservas: ReservaModel[] = [];

  cotizacionActual: {
    alojamiento: AlojamientoModel;
    fechaLlegada: string;
    fechaSalida: string;
    huespedes: number;
    noches: number;
    total: number;
  } | null = null;

  constructor() {
    const guardadas = localStorage.getItem('reservas');
    if (guardadas) {
      this.reservas = JSON.parse(guardadas);
    }
  }

  guardarCotizacion(cotizacion: any): void {
    this.cotizacionActual = cotizacion;
  }

  agregarReserva(nombre: string, correo: string): void {
    if (!this.cotizacionActual) return;

    const c = this.cotizacionActual;

    const nuevaReserva: ReservaModel = {
      id: this.reservas.length + 1,
      alojamientoId: c.alojamiento.id,
      nombreAlojamiento: c.alojamiento.nombre,
      ciudad: c.alojamiento.ciudad,
      fechaLlegada: c.fechaLlegada,
      fechaSalida: c.fechaSalida,
      huespedes: c.huespedes,
      noches: c.noches,
      total: c.total,
      nombreHuesped: nombre,
      correo: correo,
      estado: 'CONFIRMADA',
    };

    this.reservas.push(nuevaReserva);
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
    this.cotizacionActual = null;
  }

  getReservas(): ReservaModel[] {
    return this.reservas;
  }
}
