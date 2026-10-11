import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { Alojamiento } from '../../models/alojamiento.model';

@Component({
  selector: 'app-cotizacioncomponent',
  standalone: false,
  styleUrl: './cotizacioncomponent.css',
  templateUrl: './cotizacioncomponent.html',
})
export class Cotizacioncomponent {
  @Input() alojamiento: Alojamiento | undefined;

  fechaLlegada: string = '';
  fechaSalida: string = '';
  huespedes: number = 1;

  noches: number = 0;
  subtotal: number = 0;
  tarifaServicio: number = 0;
  total: number = 0;
  cotizacionValida: boolean = false;
  mensajeError: string = '';

  constructor(
    private reservaService: ReservaService,
    private router: Router,
  ) {}

  crearFecha(texto: string): Date {
    const partes = texto.split('-').map(Number);
    return new Date(partes[0], partes[1] - 1, partes[2]);
  }

  reiniciarCotizacion(): void {
    this.cotizacionValida = false;
    this.mensajeError = '';
  }

  cotizar(): void {
    this.mensajeError = '';
    this.cotizacionValida = false;

    if (!this.alojamiento) return;

    if (this.alojamiento.precioNoche <= 0) {
      this.mensajeError = 'Este alojamiento no tiene un precio válido.';
      return;
    }

    if (!this.fechaLlegada || !this.fechaSalida) {
      this.mensajeError = 'Debes seleccionar fecha de llegada y salida.';
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const llegada = this.crearFecha(this.fechaLlegada);
    const salida = this.crearFecha(this.fechaSalida);

    if (llegada < hoy) {
      this.mensajeError = 'La fecha de llegada no puede ser anterior a hoy.';
      return;
    }

    if (salida <= llegada) {
      this.mensajeError = 'La fecha de salida debe ser posterior a la fecha de llegada.';
      return;
    }

    if (!this.huespedes || this.huespedes <= 0) {
      this.mensajeError = 'El número de huéspedes debe ser mayor que cero.';
      return;
    }

    if (this.huespedes > this.alojamiento.capacidad) {
      this.mensajeError = 'El número de huéspedes supera la capacidad del alojamiento.';
      return;
    }

    const diffMs = salida.getTime() - llegada.getTime();
    this.noches = Math.round(diffMs / (1000 * 60 * 60 * 24));

    this.subtotal = this.noches * this.alojamiento.precioNoche;
    this.tarifaServicio = this.subtotal * 0.1;
    this.total = this.subtotal + this.alojamiento.tarifaLimpieza + this.tarifaServicio;

    this.cotizacionValida = true;
  }

  irAReservar(): void {
    if (!this.alojamiento || !this.cotizacionValida) return;

    this.reservaService.guardarCotizacion({
      alojamiento: this.alojamiento,
      fechaLlegada: this.fechaLlegada,
      fechaSalida: this.fechaSalida,
      huespedes: this.huespedes,
      noches: this.noches,
      total: this.total,
    });

    this.router.navigate(['/reservar']);
  }
}
