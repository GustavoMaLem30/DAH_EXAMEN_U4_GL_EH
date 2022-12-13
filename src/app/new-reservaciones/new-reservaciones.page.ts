import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Reservacion } from '../models/reservacion';
import { ClienteService } from '../services/cliente.service';
import { ReservacionService } from '../services/reservacion.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RangeCustomEvent, RangeValue } from '@ionic/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-new-reservaciones',
  templateUrl: './new-reservaciones.page.html',
  styleUrls: ['./new-reservaciones.page.scss'],
})
export class NewReservacionesPage implements OnInit {
  
  public cliente:Cliente= {tel : 0,
    nombre: "",
    domicilio: ""};
    public reservations : Reservacion[]=[];
    public reservacion:Reservacion;
    public myForm: FormGroup;
    public validationMessages: Object;
    public total=1000;
    public ava = true;
    dateInLimit = '';
    dateToday = this.formatDate(new Date());
    lastEmittedValue: RangeValue = 0;
    constructor(private reservacionService:ReservacionService, private clienteService:ClienteService,private activatedRoute: ActivatedRoute, 
      private fb: FormBuilder,private router: Router, private toastController: ToastController, private al: AlertController) {
        this.activatedRoute.queryParams.subscribe((params) => {
          this.clienteService.getClienteById(params.id).subscribe(item =>{
            this.cliente = item as Cliente;
          });
        });
        this.reservacionService.getReservacion().subscribe(res => {this.reservations = res});
      }
      
      ngOnInit() {
        var date = this.dateToday.split(' ');
        this.dateInLimit = date[0];
        this.myForm = this.fb.group(
          {
            date: ["",Validators.required],
            // alberca: [],
            // brincolin: [],
            // mesa: [],
            // futbolito: [],
            total: [],
          });
          this.validationMessages = {
            date: [{type: 'required', message: "Fecha obligatoria "}],
            // alberca: [],
            // brincolin: [],
            // mesa: [],
            // futbolito: [],
            total: [],
          }
        }
        formatDate(date: Date) {
          return (
            [
              date.getFullYear(),
              this.padTo2Digits(date.getMonth() + 1),
              this.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
              this.padTo2Digits(date.getHours()),
              this.padTo2Digits(date.getMinutes()),
              this.padTo2Digits(date.getSeconds()),
            ].join(':')
            );
          }
          public padTo2Digits(num: number) {
            return num.toString().padStart(2, '0');
          }
          rangePool(ev: Event) {
            // this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
            
            this.total = this.total - parseInt(this.lastEmittedValue.toString(),10);
            if(((ev as RangeCustomEvent).detail.value) != 0){
              if(((ev as RangeCustomEvent).detail.value) == 1){
                this.lastEmittedValue =100;
              }
              if(((ev as RangeCustomEvent).detail.value) == 2){
                this.lastEmittedValue = 200;
              }
              if(((ev as RangeCustomEvent).detail.value) == 3){
                this.lastEmittedValue = 300;
              }
              if(((ev as RangeCustomEvent).detail.value) == 4){
                this.lastEmittedValue = 400;
              }
              if(((ev as RangeCustomEvent).detail.value) == 5){
                this.lastEmittedValue = 500;
              }
              this.total = this.total + parseInt(this.lastEmittedValue.toString(),10);
            }else{
              this.lastEmittedValue = 0;
            }
          }
          pinFormatter(value: number) {
            return `${value*10}%`;
          }
          toggleMesa(event){
            if(event.detail.checked){
              this.total +=150;
            }else{
              this.total -=150;
            }
          }
          toggleBrincolin(event){
            if(event.detail.checked){
              this.total +=200;
            }else{
              this.total -=200;
            }
          }
          toggleFutbolito(event){
            if(event.detail.checked){
              this.total +=100;
            }else{
              this.total -=100;
            }
          }
          public newReservacion() {
            if(this.available()){   
              this.reservacion = {
                tel: this.cliente.tel,
                nombre: this.cliente.nombre,
                date: this.myForm.controls.date.value,
                total: this.total,
              }
              this.reservacionService.newReservacion(this.reservacion);
              this.back();
            }else{
              this.presentToast();
            }
          }
          back():void{
            this.router.navigateByUrl('');
          }
          
          async presentToast() {
            const toast = await this.toastController.create({
              position: 'middle',
              message: 'Fecha ya ocupada.',
              duration: 2000,
            });
            toast.present();
          }
          
          public async alertReservation() {
            const alert = await this.al.create({
              header: 'Confirmación',
              subHeader: '¿Estás seguro que deseas agregar la reservación?',
              message: 'Esto es una confirmación',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    
                  }
                },
                {
                  text: 'Aceptar',
                  role: 'confirm',
                  handler: () => {
                    this.newReservacion()
                  }
                }
              ]
            });
            
            await alert.present();
            
            
            
          }
          
          available(){
            this.reservacion = {
              tel: this.cliente.tel,
              nombre: this.cliente.nombre,
              date: this.myForm.controls.date.value,
              total: this.total,
            }
            for(let i=0;i<this.reservations.length;i++){
              let fecha1 = this.reservations[i].date.toString().split("T");
              let fecha2 = this.reservacion.date.toString().split("T");
              let date1 = new Date(fecha1[0]);
              let date2 = new Date(fecha2[0]);
              if(date1.getDate()==date2.getDate()){
                return false
              }
            }
            return true
          }
        }
        