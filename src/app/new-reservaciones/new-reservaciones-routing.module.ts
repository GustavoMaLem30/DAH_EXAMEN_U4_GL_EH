import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReservacionesPage } from './new-reservaciones.page';

const routes: Routes = [
  {
    path: '',
    component: NewReservacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewReservacionesPageRoutingModule {}
