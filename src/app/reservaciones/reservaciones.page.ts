import { Component, OnInit } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {

  constructor(private reservacionService: ReservacionService ) { }
  reservaciones: Reservacion[];
  ngOnInit() {
    this.reservacionService.getReservacion().subscribe(res => {
      this.reservaciones = res;
    });
  }

}
