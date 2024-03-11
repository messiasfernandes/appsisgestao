import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    PanelModule,
    PanelMenuModule,
    ToolbarModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    SidebarModule,
    DividerModule,
    TagModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PrimengModule { }
