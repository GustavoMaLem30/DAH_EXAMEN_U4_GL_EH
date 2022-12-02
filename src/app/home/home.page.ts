import { Component } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public cliente : Cliente[];
  public client:Cliente;
  public telefono:number;
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(private clienteService:ClienteService, private router: Router, private fb: FormBuilder) {
    
    this.cliente = [];
    this.clienteService.getCliente().subscribe(res =>{
      this.cliente = res;
      console.log(this.cliente);
    });
  }
  ngOnInit() {
    this.myForm = this.fb.group(
      {
        user: ["", Validators.compose([Validators.required])],
        pass: ["", Validators.compose([Validators.required])],
      });
    this.validationMessages = {
      user: [
        { type: 'required', message: "Usuario requerido" },
      ],
      pass: [
        { type: 'required', message: "contraseña requerida" },
      ]
    }
  }
  public async ingresar(){
    let tele = this.myForm.controls.user.value
    console.log('Entra');
    
    if(tele == 777){
      console.log('Admin');
      this.router.navigate(['/reservaciones']);
    }else{
      var result = this.cliente.find(({tel})=>tel === tele)


      if(!(result==null)){
        this.router.navigate(['/newReservaciones'],{
          queryParams: {tele : tele},
        });
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
