import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Alojamiento } from '../../models/alojamiento.model';
import { Resena } from '../../models/resena.model';

@Component({
  selector: 'app-detallealojamientocomponent',
  standalone: false,
  styleUrl: './detallealojamientocomponent.css',
  templateUrl: './detallealojamientocomponent.html',
})
export class Detallealojamientocomponent implements OnInit {
  alojamiento: Alojamiento | undefined;
  resenas: Resena[] = [];
  noDisponible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.dataService.getAlojamientos().subscribe({
      next: (data) => {
        const encontrado = data.alojamientos.find((a) => a.id === id);

        if (!encontrado || !encontrado.activo) {
          this.noDisponible = true;
        } else {
          this.alojamiento = encontrado;
          this.resenas = data.resenas.filter((r) => r.alojamientoId === id);
        }

        this.cdr.detectChanges();
      },
    });
  }
}
