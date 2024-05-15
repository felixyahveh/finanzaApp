import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Agregar la ruta de backend por defecto
    const defaultBackendUrl = 'http://localhost:5046/api/'; // Cambia esto con tu ruta de backend

    // Clonar la solicitud y añadir la URL de backend por defecto
    const modifiedRequest = request.clone({
      url: defaultBackendUrl + request.url,
    });

    // Añadir un encabezado automáticamente
    if(localStorage.getItem("token") === null){

    }
    const headers = modifiedRequest.headers.set('Authorization', `Bearer ${localStorage.getItem("token") || ''}`);

    // Clonar la solicitud modificada y agregar los encabezados
    const requestWithHeaders = modifiedRequest.clone({ headers });

    // Continuar con la solicitud modificada
    return next.handle(requestWithHeaders);
  }
}