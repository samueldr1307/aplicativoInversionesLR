import { LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
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
import { PuntosPipe } from './pipes/puntos.pipe';

registerLocaleData(localeEsCo);

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
    PuntosPipe,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [App],
})
export class AppModule {}
