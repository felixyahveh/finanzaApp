import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GastosVariablesDTO } from 'src/models/gatos-variables-dto';

@Injectable({
  providedIn: 'root'
})
export class GastosVariablesService {
  private dataUrl = 'GastosVariables/';

  constructor(private http:HttpClient) { }

  public obtenerGastosFijos():Observable<GastosVariablesDTO[]>{
    return this.http.get<GastosVariablesDTO[]>(this.dataUrl+'Usuario/');
  }

  public guardarIngreso(gasto:GastosVariablesDTO):Observable<any>{
    return this.http.post<any>(this.dataUrl,gasto)
  }

  public editarIngreso(gasto:GastosVariablesDTO):Observable<any>{
    return this.http.put<any>(this.dataUrl+gasto.id+'/',gasto)
  }

  public eliminarIngreso(id:number):Observable<any>{
    return this.http.delete<any>(this.dataUrl+id+'/')
  }
}
