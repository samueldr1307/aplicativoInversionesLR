import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-mis-reservas',
  standalone: false,
  styleUrl: './mis-reservas.css',
  templateUrl: './mis-reservas.html',
})
export class MisReservas implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservas = this.reservaService.getReservas();
  }
}
