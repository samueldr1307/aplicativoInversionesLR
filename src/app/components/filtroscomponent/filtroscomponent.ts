import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filtro } from '../../models/filtro.model';

@Component({
  selector: 'app-filtros',
  standalone: false,
  styleUrl: './filtros.css',
  templateUrl: './filtros.html',
})
export class Filtros {

  @Input() ciudades: string[] = [];
  @Input() tipos: string[] = [];
  @Output() filtrosCambiaron = new EventEmitter<Filtro>();

  ciudad: string = '';
  huespedes: number | null = null;
  tipo: string = '';
  precioMax: number | null = null;

  cambio(): void {
    this.filtrosCambiaron.emit({
      ciudad: this.ciudad,
      huespedes: this.huespedes,
      tipo: this.tipo,
      precioMax: this.precioMax
    });
  }

  limpiar(): void {
    this.ciudad = '';
    this.huespedes = null;
    this.tipo = '';
    this.precioMax = null;
    this.cambio();
  }

}
