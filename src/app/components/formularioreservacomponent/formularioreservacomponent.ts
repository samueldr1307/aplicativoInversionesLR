import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService, CotizacionData } from '../../services/reserva.service';

@Component({
  selector: 'app-formularioreservacomponent',
  standalone: false,
  styleUrl: './formularioreservacomponent.css',
  templateUrl: './formularioreservacomponent.html',
})
export class Formularioreservacomponent implements OnInit {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  aceptoReglas: boolean = true;
  mensajeError: string = '';
  procesando: boolean = false;
  cotizacion: CotizacionData | null = null;

  subtotalCalculado: number = 0;
  tarifaLimpiezaCalculada: number = 0;
  tarifaServicioCalculada: number = 0;

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cotizacion = this.reservaService.cotizacionActual;
    if (this.cotizacion && this.cotizacion.alojamiento) {
      const noches = Number(this.cotizacion.noches) || 1;
      const precioNoche = Number(this.cotizacion.alojamiento.precioNoche) || 0;
      this.subtotalCalculado = noches * precioNoche;
      this.tarifaLimpiezaCalculada = Number(this.cotizacion.alojamiento.tarifaLimpieza) || 0;
      this.tarifaServicioCalculada = Math.round(this.subtotalCalculado * 0.1);
      if (!this.cotizacion.total || isNaN(Number(this.cotizacion.total))) {
        this.cotizacion.total = this.subtotalCalculado + this.tarifaLimpiezaCalculada + this.tarifaServicioCalculada;
      }
    }
  }

  correoValido(texto: string): boolean {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(texto.trim());
  }

  confirmarReserva(): void {
    if (this.procesando) return;
    this.mensajeError = '';

    if (!this.cotizacion) {
      this.mensajeError = 'No hay ninguna cotización activa para reservar.';
      return;
    }

    const nombreLimpio = this.nombre.trim();
    const correoLimpio = this.correo.trim();

    if (!nombreLimpio) {
      this.mensajeError = 'Por favor, ingresa el nombre completo del huésped.';
      return;
    }

    if (nombreLimpio.length < 3) {
      this.mensajeError = 'El nombre del huésped debe tener al menos 3 caracteres.';
      return;
    }

    if (!correoLimpio) {
      this.mensajeError = 'Por favor, ingresa un correo electrónico de contacto.';
      return;
    }

    if (!this.correoValido(correoLimpio)) {
      this.mensajeError = 'El correo electrónico no tiene un formato válido (ejemplo: usuario@correo.com).';
      return;
    }

    if (!this.aceptoReglas) {
      this.mensajeError = 'Debes aceptar las reglas del alojamiento para completar la reserva.';
      return;
    }

    this.procesando = true;

    const reservaCreada = this.reservaService.agregarReserva(nombreLimpio, correoLimpio);

    if (reservaCreada) {
      this.router.navigate(['/mis-reservas'], {
        queryParams: { nueva: reservaCreada.id }
      });
    } else {
      this.procesando = false;
      this.mensajeError = 'Ocurrió un error al registrar la reserva. Intenta nuevamente.';
    }
  }

  volverAlDetalle(): void {
    if (this.cotizacion && this.cotizacion.alojamiento) {
      this.router.navigate(['/alojamiento', this.cotizacion.alojamiento.id]);
    } else {
      this.router.navigate(['/listado']);
    }
  }
}

