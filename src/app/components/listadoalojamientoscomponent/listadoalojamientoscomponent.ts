import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Alojamiento } from '../../models/alojamiento.model';
import { Filtro } from '../../models/filtro.model';

@Component({
  selector: 'app-listado-alojamientos',
  standalone: false,
  styleUrl: './listadoalojamientoscomponent.css',
  templateUrl: './listadoalojamientoscomponent.html',
})
export class ListadoAlojamientos implements OnInit {
  todos: Alojamiento[] = [];
  filtrados: Alojamiento[] = [];
  ciudades: string[] = [];
  tipos: string[] = [];

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dataService.getAlojamientos().subscribe({
      next: (data) => {
        this.todos = data.alojamientos.filter((a) => a.activo);
        this.filtrados = this.todos;
        this.ciudades = [...new Set(this.todos.map((a) => a.ciudad))];
        this.tipos = [...new Set(this.todos.map((a) => a.tipo))];
        this.cdr.detectChanges();
      },
    });
  }

  aplicarFiltros(filtro: Filtro): void {
    this.filtrados = this.todos.filter((a) => {
      if (filtro.ciudad && a.ciudad !== filtro.ciudad) return false;
      if (filtro.huespedes && a.capacidad < filtro.huespedes) return false;
      if (filtro.tipo && a.tipo !== filtro.tipo) return false;
      if (filtro.precioMax && a.precioNoche > filtro.precioMax) return false;
      return true;
    });
  }
}
