import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  cliente : Cliente[];
  constructor(private firestore:AngularFirestore) {
    this.cliente=[];
  }
  public getCliente(): Observable<Cliente[]>{
    return this.firestore.collection('cliente').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as Cliente;
          console.log(data);
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }));
    }
  }
  