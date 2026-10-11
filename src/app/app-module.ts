import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Alojamientocardcomponent } from './components/alojamientocardcomponent/alojamientocardcomponent';
import { Cotizacioncomponent } from './components/cotizacioncomponent/cotizacioncomponent';
import { Detallealojamientocomponent } from './components/detallealojamientocomponent/detallealojamientocomponent';

@NgModule({
  declarations: [App, Alojamientocardcomponent, Cotizacioncomponent, Detallealojamientocomponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
