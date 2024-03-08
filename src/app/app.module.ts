import { PrimengModule } from './shared/primeng/primeng.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';
import { ProdutolistaComponent } from './produto/produtolista/produtolista.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProdutoService } from './services/produto.service';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProdutocadastroComponent } from './produto/produtocadastro/produtocadastro.component';

registerLocaleData(localePt, 'pt-BR');
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    ProdutolistaComponent,
    ProdutocadastroComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [HttpClientModule, ProdutoService, TranslateService, { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
