import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GastosVariablesDTO } from 'src/models/gatos-variables-dto';
import { AlertService } from 'src/services/alert.service';
import { GastosVariablesService } from 'src/services/gastos-variables.service';
import { GastosVariablesFormularioComponent } from './gastos-variables-formulario/gastos-variables-formulario.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  protected ingresos:GastosVariablesDTO[] = [];

  constructor(private gastosVariablesService:GastosVariablesService,
              private modalController:ModalController,
              private alert:AlertService
  ) {}

  ionViewWillEnter(){
    this.obtenerGastosVariables();
  }

  obtenerGastosVariables(){
    this.gastosVariablesService.obtenerGastosFijos().subscribe(res => {
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
      component: GastosVariablesFormularioComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      canDismiss: true,
      componentProps: {
        action: 'Agregar',
        gastoVariable: {
          cantidad: undefined,
          concepto: '',
          fecha: new Date(),
          usuarioId: 0
        },
      }
    })

    modal.onDidDismiss().then( x => this.obtenerGastosVariables())

    await modal.present();

  }

  async editar(gasto:GastosVariablesDTO){
    const modal = await this.modalController.create({
      component: GastosVariablesFormularioComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      canDismiss: true,
      componentProps: {
        action: 'Editar',
        gastoVariable: gasto,
      }
    })

    modal.onDidDismiss().then( x => this.obtenerGastosVariables())

    await modal.present();
  }

  eliminar(ingreso:GastosVariablesDTO){
    this.gastosVariablesService.eliminarIngreso(ingreso.id).subscribe(res => {
      this.alert.mostrarMensaje('Eliminado exitosamente','Se ha eliminado el ingreso exitosamente')
      this.obtenerGastosVariables();
    }, err => {
      this.alert.mostrarMensaje('Error','Ocurrio un error durante el proceso, intenetelo nuevamente')
    })
  }

}
