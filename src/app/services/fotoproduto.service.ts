import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { config } from '../config/ini';

@Injectable({
  providedIn: 'root',
})
export class FotoProdutoService {
  constructor(private http: HttpClient) {}

  upload(arquivo: FormData): Observable<any> {
    console.log(arquivo);
    return this.http.post(`${config.baseurl}arquivos/fotos`, arquivo);
  }
  buscarfoto(parametro: string) {
    var arquivo: string;

    arquivo = `${config.baseurl}arquivos/fotos/` + parametro;

    return arquivo;
  }

  removerArquivo(nomeArquivo: string) {
    return this.http
      .delete(`${config.baseurl}arquivos/fotos/${nomeArquivo}`)
      .subscribe(() => null);
  }
  capitpurarImagem(file: File): any {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event: any) => {
      console.log(event);
      return event.target.result;
    };
  }
}
