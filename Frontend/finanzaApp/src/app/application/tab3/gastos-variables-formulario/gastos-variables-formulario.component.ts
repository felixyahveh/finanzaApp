import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GastosVariablesDTO } from 'src/models/gatos-variables-dto';
import { AlertService } from 'src/services/alert.service';
import { GastosFijosService } from 'src/services/gastos-fijos.service';
import { GastosVariablesService } from 'src/services/gastos-variables.service';

@Component({
  selector: 'app-gastos-variables-formulario',
  templateUrl: './gastos-variables-formulario.component.html',
  styleUrls: ['./gastos-variables-formulario.component.scss'],
})
export class GastosVariablesFormularioComponent  implements OnInit {
  action:string;
  gastoVariable:GastosVariablesDTO;

  hoy = new Date();

  constructor(private gastosVariablesService:GastosVariablesService,
              private alert:AlertService,
              private modalController:ModalController
  ) { }

  ngOnInit() {
    console.log(this.gastoVariable)
  }

  guardar(){
    this.gastoVariable.fecha = new Date(this.gastoVariable.fecha)
    console.log(this.gastoVariable)
    if(this.action == 'Agregar'){
      this.agregar();
    }else if(this.action == 'Editar'){
      this.modificar();
    }
  }

  agregar(){
    this.gastosVariablesService.guardarIngreso(this.gastoVariable).subscribe(res => {
      this.cerrarModal();
      this.alert.mostrarMensaje('Guardado exitosamente','Se ha guardado el ingreso exitosamente')
    }, err => {
      this.alert.mostrarMensaje('Error','Ocurrio un error durante el proceso, intenetelo nuevamente')
    })
  }

  modificar(){
    this.gastosVariablesService.editarIngreso(this.gastoVariable).subscribe(res => {
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
