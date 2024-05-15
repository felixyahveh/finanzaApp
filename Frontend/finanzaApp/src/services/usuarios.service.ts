import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/models/login-dto';
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

  public logIn(data:LoginDTO): Observable<{token:string}>{
    return this.http.post<{token:string}>(this.dataUrl+'login',data)
  }
}
