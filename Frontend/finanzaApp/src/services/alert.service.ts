import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController:AlertController) { }

  public async mostrarMensaje(titulo:string, mensaje:string){
    const alert = await this.alertController.create(
    {
      header: titulo,
      message: mensaje,
      buttons: ['Ok']
    });

    await alert.present()
  }
}
