import { Component } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public cliente : Cliente[];
  constructor(private clienteService:ClienteService, private router: Router) {
    this.cliente = [];
    this.clienteService.getCliente().subscribe(res =>{
      this.cliente = res;
      console.log(this.cliente);
    });
  }

  public async ingresar(tele:number){
    console.log('Entra');
    
    if(tele == 777){
      console.log('Admin');
      this.router.navigate(['/reservaciones']);
    }else{
      var result = this.cliente.find(({tel})=>tel === tele)
      if(!(result==null)){
        this.router.navigate(['/newReservaciones']);
        return console.log('cliente encontrado');
      }else{
        return console.log('cliente no encontrado');
      }
    }
  }

  public getCliente(user:string):boolean{
    
    return false
  }

}
