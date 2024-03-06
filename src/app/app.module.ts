import { PrimengModule } from './shared/primeng/primeng.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';
import { ProdutolistaComponent } from './produto/produtolista/produtolista.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    ProdutolistaComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
