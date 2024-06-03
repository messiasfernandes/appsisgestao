import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { config } from '../config/ini';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  constructor(private http: HttpClient) { }


  pesquisar(): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const response = this.http.get<any>(`${config.baseurl}mesas`,  {
      headers,

    });

    return response;
  }
}
