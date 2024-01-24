import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProviderRoutingModule } from "./provider-routing.module";
import { SharedModule } from "@shared/shared.module";

import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { ProviderListComponent } from "./components/provider-list/provider-list.component";
import { ProviderManageComponent } from './components/provider-manage/provider-manage.component';
import { ExportExcelComponent } from "@shared/components/reusables/export-excel/export-excel.component";
import { FilterDataRangeYmdComponent } from "@shared/components/reusables/filter-data-range-ymd/filter-data-range-ymd.component";
import { ButtonResetFiltersComponent } from "@shared/components/reusables/button-reset-filters/button-reset-filters.component";

@NgModule({
  declarations: [ProviderListComponent, ProviderManageComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDataRangeYmdComponent,
    ButtonResetFiltersComponent
  ],
})
export class ProviderModule {}
