import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Alojamiento } from '../../models/alojamiento.model';

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './homecomponent.css',
  templateUrl: './homecomponent.html',
})
export class Home implements OnInit {
  destacados: Alojamiento[] = [];

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dataService.getAlojamientos().subscribe({
      next: (data) => {
        const activos = data.alojamientos.filter((a) => a.activo);
        const ordenados = activos.sort((a, b) => b.calificacion - a.calificacion);
        this.destacados = ordenados.slice(0, 3);
        this.cdr.detectChanges();
      },
    });
  }
}
