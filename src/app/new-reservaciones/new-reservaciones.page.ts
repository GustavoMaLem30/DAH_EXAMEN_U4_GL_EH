import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Reservacion } from '../models/reservacion';
import { ClienteService } from '../services/cliente.service';
import { ReservacionService } from '../services/reservacion.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-reservaciones',
  templateUrl: './new-reservaciones.page.html',
  styleUrls: ['./new-reservaciones.page.scss'],
})
export class NewReservacionesPage implements OnInit {
  public cliente:Cliente;
  public reservacion:Reservacion;
  public myForm: FormGroup;
  public validationMessages: Object;
  constructor(private reservacionService:ReservacionService, clienteService:ClienteService,private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder) {
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   // this.student = this.studentService.getStudentByControlNumber(params.cn);
    //   // clienteService.getCliente(params.tel).subscribe(item =>{
    //   //   console.log(item);
    //   //   this.student = item as Student;
        
    //   // });
    // });
  }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        user: [],
        pass: [],
      });
    this.validationMessages = {
      user: [],
      pass: []
    }
  }

  public newReservacion() {
    this.reservacion = {
      tel: 3113938685,
      nombre: "Eduardo",
      date: this.myForm.controls.curp.value,
      alberca: this.myForm.controls.age.value,
      brincolin: this.myForm.controls.nip.value,
      mesa: this.myForm.controls.email.value,
      futbolito: this.myForm.controls.career.value,
      total: this.myForm.controls.photo.value,
    }
    this.reservacionService.newReservacion(this.reservacion);
    console.log(this.reservacionService.newReservacion(this.reservacion));
    this.back();
  }
  back():void{
    this.router.navigateByUrl('');
  }
}
