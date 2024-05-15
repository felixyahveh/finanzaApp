import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ingresosDTO } from 'src/models/ingresos-dto';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private dataUrl = 'Ingresos/'

  constructor(private http:HttpClient) { }

  public obtenerIngresos():Observable<ingresosDTO[]>{
    return this.http.get<ingresosDTO[]>(this.dataUrl+'Usuario/')
  }

  public guardarIngreso(ingreso:ingresosDTO):Observable<any>{
    return this.http.post<any>(this.dataUrl,ingreso)
  }
}
