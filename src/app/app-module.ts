import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Filtroscomponent } from './components/filtroscomponent/filtroscomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Formularioreservacomponent } from './components/formularioreservacomponent/formularioreservacomponent';

@NgModule({
  declarations: [App, Filtroscomponent, Footercomponent, Formularioreservacomponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
