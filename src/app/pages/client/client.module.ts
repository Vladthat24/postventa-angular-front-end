import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { FilterDataRangeYmdComponent } from '@shared/components/reusables/filter-data-range-ymd/filter-data-range-ymd.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { ClientManageComponent } from './components/client-manage/client-manage.component';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientManageComponent
  ],
  imports: [
    ClientRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDataRangeYmdComponent,
    ButtonResetFiltersComponent
  ]
})
export class ClientModule { }
