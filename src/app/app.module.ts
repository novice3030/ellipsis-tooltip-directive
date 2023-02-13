import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EllipsisTooltipDirective } from 'src/directives/ellipsis-tooltip.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, EllipsisTooltipDirective],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
