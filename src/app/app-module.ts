import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Alojamientocardcomponent } from './components/alojamientocardcomponent/alojamientocardcomponent';
import { Cotizacioncomponent } from './components/cotizacioncomponent/cotizacioncomponent';
import { Detallealojamientocomponent } from './components/detallealojamientocomponent/detallealojamientocomponent';
import { Filtros } from './components/filtroscomponent/filtroscomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Formularioreservacomponent } from './components/formularioreservacomponent/formularioreservacomponent';
import { Home } from './components/homecomponent/homecomponent';
import { ListadoAlojamientos } from './components/listadoalojamientoscomponent/listadoalojamientoscomponent';
import { MisReservas } from './components/misreservascomponent/misreservascomponent';
import { Navbar } from './components/navbarcomponent/navbarcomponent';

@NgModule({
  declarations: [
    App,
    Alojamientocardcomponent,
    Cotizacioncomponent,
    Detallealojamientocomponent,
    Filtros,
    Footercomponent,
    Formularioreservacomponent,
    Home,
    ListadoAlojamientos,
    MisReservas,
    Navbar,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
