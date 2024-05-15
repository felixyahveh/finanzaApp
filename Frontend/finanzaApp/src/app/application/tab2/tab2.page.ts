import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ingresosDTO } from 'src/models/ingresos-dto';
import { IngresosService } from 'src/services/ingresos.service';
import { AlertService } from '../../../services/alert.service';
import { GastosFijosService } from 'src/services/gastos-fijos.service';
import { GastosFijosFormularioComponent } from './gastos-fijos-formulario/gastos-fijos-formulario.component';
import { GastosFijosDTO } from 'src/models/gastos-fijos-dto';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  protected ingresos:ingresosDTO[] = [];

  constructor(private gastosFijosService:GastosFijosService,
              private modalController:ModalController,
              private alert:AlertService
  ) {}

  ionViewWillEnter(){
    this.obtenerGastosFijos();
  }

  obtenerGastosFijos(){
    this.gastosFijosService.obtenerGastosFijos().subscribe(res => {
      res.forEach(x => x.fecha = new Date(x.fecha))
      this.ingresos = res;
      this.ingresos.sort((a,b) => b.fecha.getTime() - a.fecha.getTime())
    })
  }

  imprimirFecha(fecha:Date){
    return (fecha.getDate()+1) + ' / ' + (fecha.getMonth() +1) + ' / ' + fecha.getFullYear()
  }

  async agregar(){
    const modal = await this.modalController.create({
      component: GastosFijosFormularioComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      canDismiss: true,
      componentProps: {
        action: 'Agregar',
        gastoFijo: {
          cantidad: undefined,
          concepto: '',
          fecha: new Date(),
          usuarioId: 0
        },
      }
    })

    modal.onDidDismiss().then( x => this.obtenerGastosFijos())

    await modal.present();

  }

  async editar(gasto:GastosFijosDTO){
    const modal = await this.modalController.create({
      component: GastosFijosFormularioComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      canDismiss: true,
      componentProps: {
        action: 'Editar',
        gastoFijo: gasto,
      }
    })

    modal.onDidDismiss().then( x => this.obtenerGastosFijos())

    await modal.present();
  }

  eliminar(ingreso:ingresosDTO){
    this.gastosFijosService.eliminarIngreso(ingreso.id).subscribe(res => {
      this.alert.mostrarMensaje('Eliminado exitosamente','Se ha eliminado el ingreso exitosamente')
      this.obtenerGastosFijos();
    }, err => {
      this.alert.mostrarMensaje('Error','Ocurrio un error durante el proceso, intenetelo nuevamente')
    })
  }

}
