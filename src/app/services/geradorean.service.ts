import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { config } from '../config/ini';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class GeradoreanService {

  constructor(private http: HttpClient) { }

  GerarEn13(): Observable<string> {
    return this.http.post<string>(
      `${config.baseurl}gerarean13`,
      {},
      {
        observe: 'response',
      }
    ).pipe(
      map(response => response.body as string) // Extrair o corpo da resposta e convertê-lo em string
    );
  }
}
