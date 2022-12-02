import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReservacionesPageRoutingModule } from './new-reservaciones-routing.module';

import { NewReservacionesPage } from './new-reservaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewReservacionesPageRoutingModule
  ],
  declarations: [NewReservacionesPage]
})
export class NewReservacionesPageModule {}
