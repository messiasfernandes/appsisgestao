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
import { InputNumberModule } from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {MessageModule} from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import {DialogService, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from "primeng/calendar";
import {TreeModule} from 'primeng/tree';
import { AutoCompleteModule } from "primeng/autocomplete";
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
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
    TagModule,
    InputNumberModule,
    DropdownModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    TabViewModule,
    CalendarModule,
    TreeModule,
    AutoCompleteModule,
    DataViewModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers:[MessageService, ConfirmationService, DialogService,DynamicDialogConfig]
})
export class PrimengModule { }
