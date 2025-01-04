import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaticoService {
  private apiUrl = 'http://localhost:8080/api/viaticos';

  constructor(private http: HttpClient) { }

  // Método para registrar un viático (corresponde al backend '/api/viaticos/registro')
  registrarViatico(viatico: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, viatico).pipe(
      catchError((error) => {
        console.error('Error en la solicitud de registro', error);
        return throwError(() => new Error('Error al registrar el viático.'));
      })
    );
  }

  // Método para obtener un viático por su ID
  obtenerViatico(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el viático por ID', error);
        return throwError(() => new Error('Error al obtener el viático.'));
      })
    );
  }

  // Método para aprobar un viático por su ID
  aprobarViatico(viaticoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${viaticoId}/aprobar`, {}).pipe(
      catchError((error) => {
        console.error('Error al aprobar el viático', error);
        return throwError(() => new Error('Error al aprobar el viático.'));
      })
    );
  }

  // Método para buscar un viático por identificación
  obtenerViaticoPorIdentificacion(identificacion: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar/${identificacion}`).pipe(
      catchError((error) => {
        console.error('Error al buscar el viático por identificación', error);
        return throwError(() => new Error('Error al buscar el viático.'));
      })
    );
  }
}
