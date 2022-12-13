import { Injectable } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  reservacion:Reservacion[];
  reserva:Reservacion;
  constructor(private firestore:AngularFirestore) {
    this.reservacion=[];
  }
  public getReservacion():Observable<Reservacion[]>{
    return this.firestore.collection('reservacion').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as Reservacion;
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }));
  }
  public newReservacion(reservacion:Reservacion){
    this.firestore.collection('reservacion').add(reservacion);
  }
  public removeReservacion(pos: string){
    this.firestore.collection('reservacion').doc(pos).delete();
  }
  public async updateReservacion(reservacion:Reservacion,id: string){
    try{
       let result = await this.firestore.collection('reservacion').doc(id).update(reservacion );
      return result
    }catch(err){
      console.log(err);
      return null;
    }
  }
}
  