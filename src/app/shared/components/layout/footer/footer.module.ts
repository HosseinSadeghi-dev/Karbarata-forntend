import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../../../pipes/pipes.module';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        PipesModule,
        ReactiveFormsModule
    ]
})
export class FooterModule { }
