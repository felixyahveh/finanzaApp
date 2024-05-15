import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosDTO } from 'src/models/usuarios-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private dataUrl = 'Usuarios/'

  constructor(private http:HttpClient) { }

  public obtenerUsuarios():Observable<UsuariosDTO[]>{
    return this.http.get<UsuariosDTO[]>(this.dataUrl);
  }
}
