import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ingresosDTO } from 'src/models/ingresos-dto';
import { IngresosService } from 'src/services/ingresos.service';
import { IngresosFormularioComponent } from './ingresos-formulario/ingresos-formulario.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  protected ingresos:ingresosDTO[] = [];

  constructor(private ingresosService:IngresosService,
              private modalController:ModalController
  ) {}

  ionViewWillEnter(){
    this.obtenerIngresos();
  }

  obtenerIngresos(){
    this.ingresosService.obtenerIngresos().subscribe(res => {
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
      component: IngresosFormularioComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      canDismiss: true,
      componentProps: {
        action: 'Agregar',
        ingreso: {
          cantidad: undefined,
          concepto: '',
          fecha: new Date(),
          usuarioId: 0
        },
      }
    })

    modal.onDidDismiss().then( x => this.obtenerIngresos())

    await modal.present();

  }

}
