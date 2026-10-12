import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/homecomponent/homecomponent';
import { ListadoAlojamientos } from './components/listadoalojamientoscomponent/listadoalojamientoscomponent';
import { Detallealojamientocomponent } from './components/detallealojamientocomponent/detallealojamientocomponent';
import { Formularioreservacomponent } from './components/formularioreservacomponent/formularioreservacomponent';
import { MisReservas } from './components/misreservascomponent/misreservascomponent';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'listado', component: ListadoAlojamientos },
  { path: 'alojamiento/:id', component: Detallealojamientocomponent },
  { path: 'reservar', component: Formularioreservacomponent },
  { path: 'mis-reservas', component: MisReservas },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
