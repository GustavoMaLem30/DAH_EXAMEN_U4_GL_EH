import { Component } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
    
    if(tele == 777){
      this.router.navigate(['/reservaciones']);
    }else{
      var result = this.cliente.find(({tel})=>tel === tele)
      this.client = result as Cliente;
      if(!(result==null)){
        this.router.navigate(['/new-reservaciones'],{
          queryParams: {id : this.client.id},
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
