import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Navbarcomponent } from './components/components/navbarcomponent/navbarcomponent';
import { Misreservascomponent } from './components/components/misreservascomponent/misreservascomponent';
import { Listadoalojamientoscomponent } from './components/listadoalojamientoscomponent/listadoalojamientoscomponent';

@NgModule({
  declarations: [
    App,
    Navbar,
    Homecomponent,
    Navbarcomponent,
    Misreservascomponent,
    Listadoalojamientoscomponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
