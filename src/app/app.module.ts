import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from '@app/core/core.module';
import {SharedModule} from '@app/shared/shared.module';
import {FooterModule} from "@app/shared/components";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        FooterModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
