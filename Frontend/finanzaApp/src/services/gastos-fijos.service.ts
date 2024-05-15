import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastosFijosDTO } from 'src/models/gastos-fijos-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosFijosService {
  private dataUrl = 'GastosFijos/';

  constructor(private http:HttpClient) { }

  public obtenerGastosFijos():Observable<GastosFijosDTO[]>{
    return this.http.get<GastosFijosDTO[]>(this.dataUrl+'Usuario/');
  }

  public guardarIngreso(gasto:GastosFijosDTO):Observable<any>{
    return this.http.post<any>(this.dataUrl,gasto)
  }

  public editarIngreso(gasto:GastosFijosDTO):Observable<any>{
    return this.http.put<any>(this.dataUrl+gasto.id+'/',gasto)
  }

  public eliminarIngreso(id:number):Observable<any>{
    return this.http.delete<any>(this.dataUrl+id+'/')
  }
}
