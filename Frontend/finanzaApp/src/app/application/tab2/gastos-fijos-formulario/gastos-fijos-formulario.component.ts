import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GastosFijosDTO } from 'src/models/gastos-fijos-dto';
import { AlertService } from 'src/services/alert.service';
import { GastosFijosService } from 'src/services/gastos-fijos.service';

@Component({
  selector: 'app-gastos-fijos-formulario',
  templateUrl: './gastos-fijos-formulario.component.html',
  styleUrls: ['./gastos-fijos-formulario.component.scss'],
})
export class GastosFijosFormularioComponent  implements OnInit {
  action:string;
  gastoFijo:GastosFijosDTO;

  hoy = new Date();

  constructor(private gastosFijosService:GastosFijosService,
              private alert:AlertService,
              private modalController:ModalController
  ) { }

  ngOnInit() {
    console.log(this.gastoFijo)
  }

  guardar(){
    this.gastoFijo.fecha = new Date(this.gastoFijo.fecha)
    console.log(this.gastoFijo)
    if(this.action == 'Agregar'){
      this.agregar();
    }else if(this.action == 'Editar'){
      this.modificar();
    }
  }

  agregar(){
    this.gastosFijosService.guardarIngreso(this.gastoFijo).subscribe(res => {
      this.cerrarModal();
      this.alert.mostrarMensaje('Guardado exitosamente','Se ha guardado el ingreso exitosamente')
    }, err => {
      this.alert.mostrarMensaje('Error','Ocurrio un error durante el proceso, intenetelo nuevamente')
    })
  }

  modificar(){
    this.gastosFijosService.editarIngreso(this.gastoFijo).subscribe(res => {
      this.cerrarModal();
      this.alert.mostrarMensaje('Guardado exitosamente','Se ha guardado el ingreso exitosamente')
    }, err => {
      this.alert.mostrarMensaje('Error','Ocurrio un error durante el proceso, intenetelo nuevamente')
    })
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

}
