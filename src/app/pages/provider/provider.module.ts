import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProviderRoutingModule } from "./provider-routing.module";
import { SharedModule } from "@shared/shared.module";

import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { ListTableComponent } from "@shared/components/reusables/list-table/list-table.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { ProviderListComponent } from "./components/provider-list/provider-list.component";
import { ProviderManageComponent } from './components/provider-manage/provider-manage.component';

@NgModule({
  declarations: [ProviderListComponent, ProviderManageComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
  ],
})
export class ProviderModule {}
