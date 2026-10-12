import { Component, Input } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento.model';

@Component({
  selector: 'app-alojamiento-card',
  standalone: false,
  styleUrl: './alojamientocardcomponent.css',
  templateUrl: './alojamientocardcomponent.html',
})
export class Alojamientocardcomponent {
  @Input() alojamiento: Alojamiento | undefined;
  @Input() mostrarDetalles: boolean = false;
}
