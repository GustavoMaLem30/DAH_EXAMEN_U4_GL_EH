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
  reservaciones: Reservacion[]=[];
  reservaciones2: Reservacion[]=[];
  show = false;
  ngOnInit() {
    this.reservacionService.getReservacion().subscribe(res => {
      this.reservaciones = res;
    });
  }
  public async show2(){
    await this.reservaciones2.push(this.reservaciones[0]);
    await this.reservaciones2.push(this.reservaciones[1]);
  }
  public rese2(ev){
    this.reservaciones2 = [];
    this.show2();
    this.show = ev.detail.checked;
  }

}
