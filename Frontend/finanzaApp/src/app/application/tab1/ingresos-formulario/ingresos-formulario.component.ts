import { Component, OnInit } from '@angular/core';
import { ingresosDTO } from 'src/models/ingresos-dto';
import { IngresosService } from '../../../../services/ingresos.service';
import { AlertService } from '../../../../services/alert.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ingresos-formulario',
  templateUrl: './ingresos-formulario.component.html',
  styleUrls: ['./ingresos-formulario.component.scss'],
})
export class IngresosFormularioComponent  implements OnInit {
  action:string;
  ingreso:ingresosDTO;

  hoy = new Date();

  constructor(private ingresosService:IngresosService,
              private alert:AlertService,
              private modalController:ModalController
  ) { }

  ngOnInit() {
    console.log(this.ingreso)
  }

  guardar(){
    this.ingreso.fecha = new Date(this.ingreso.fecha)
    console.log(this.ingreso)
    if(this.action == 'Agregar'){
      this.agregar();
    }else if(this.action == 'Editar'){
      this.modificar();
    }
  }

  agregar(){
    this.ingresosService.guardarIngreso(this.ingreso).subscribe(res => {
      this.cerrarModal();
      this.alert.mostrarMensaje('Guardado exitosamente','Se ha guardado el ingreso exitosamente')
    }, err => {
      this.alert.mostrarMensaje('Error','Ocurrio un error durante el proceso, intenetelo nuevamente')
    })
  }

  modificar(){
    this.ingresosService.editarIngreso(this.ingreso).subscribe(res => {
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
