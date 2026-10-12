import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-mis-reservas',
  standalone: false,
  styleUrl: './misreservascomponent.css',
  templateUrl: './misreservascomponent.html',
})
export class MisReservas implements OnInit {
  reservas: Reserva[] = [];
  reservaNuevaId: number | null = null;
  mensajeAlerta: string = '';
  tipoAlerta: 'success' | 'warning' | 'info' = 'success';
  filtroEstado: 'TODAS' | 'CONFIRMADA' | 'CANCELADA' = 'TODAS';

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarReservas();

    this.route.queryParams.subscribe((params) => {
      if (params['nueva']) {
        this.reservaNuevaId = Number(params['nueva']);
        this.mostrarAlerta(
          `¡Tu reserva #${this.reservaNuevaId} ha sido confirmada con éxito! Te esperamos para disfrutar tu estancia.`,
          'success'
        );
      }
    });
  }

  cargarReservas(): void {
    this.reservas = this.reservaService.getReservas();
  }

  get reservasFiltradas(): Reserva[] {
    if (this.filtroEstado === 'TODAS') {
      return this.reservas;
    }
    return this.reservas.filter((r) => r.estado === this.filtroEstado);
  }

  get totalInversion(): number {
    return this.reservas
      .filter((r) => r.estado === 'CONFIRMADA')
      .reduce((sum, r) => sum + (Number(r.total) || 0), 0);
  }

  get cantidadConfirmadas(): number {
    return this.reservas.filter((r) => r.estado === 'CONFIRMADA').length;
  }

  get cantidadCanceladas(): number {
    return this.reservas.filter((r) => r.estado === 'CANCELADA').length;
  }

  cambiarFiltro(nuevoFiltro: 'TODAS' | 'CONFIRMADA' | 'CANCELADA'): void {
    this.filtroEstado = nuevoFiltro;
  }

  cancelarReserva(id: number, nombreAlojamiento: string): void {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas cancelar la reserva #${id} para "${nombreAlojamiento}"?`
    );

    if (confirmacion) {
      const cancelada = this.reservaService.cancelarReserva(id);
      if (cancelada) {
        this.cargarReservas();
        this.mostrarAlerta(`La reserva #${id} ha sido cancelada correctamente.`, 'warning');
      }
    }
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'warning' | 'info'): void {
    this.mensajeAlerta = mensaje;
    this.tipoAlerta = tipo;
  }

  cerrarAlerta(): void {
    this.mensajeAlerta = '';
  }
}

