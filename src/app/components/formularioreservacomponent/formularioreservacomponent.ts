import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
@Component({
  selector: 'app-formularioreservacomponent',
  standalone: false,
  styleUrl: './formularioreservacomponent.css',
  templateUrl: './formularioreservacomponent.html',
})
export class Formularioreservacomponent {
  nombre: string = '';
  correo: string = '';
  mensajeError: string = '';
  cotizacion: any;

  constructor(private reservaService: ReservaService, private router: Router) {
    this.cotizacion = this.reservaService.cotizacionActual;
  }

  correoValido(texto: string): boolean {
    const arroba = texto.indexOf('@');
    const punto = texto.lastIndexOf('.');
    return arroba > 0 && punto > arroba + 1 && punto < texto.length - 1;
  }

  confirmarReserva(): void {
    this.mensajeError = '';

    if (!this.nombre.trim() || !this.correo.trim()) {
      this.mensajeError = 'Debes ingresar nombre y correo.';
      return;
    }

    if (!this.correoValido(this.correo.trim())) {
      this.mensajeError = 'El correo electrónico no tiene un formato válido.';
      return;
    }

    this.reservaService.agregarReserva(this.nombre.trim(), this.correo.trim());
    this.router.navigate(['/mis-reservas']);
  }
}
