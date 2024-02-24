import { Component, OnInit } from "@angular/core";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { ProviderSelectService } from "@shared/services/provider-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { ProviderService } from "src/app/pages/provider/services/provider.service";

@Component({
  selector: "vex-purcharse-create",
  templateUrl: "./purcharse-create.component.html",
  styleUrls: ["./purcharse-create.component.scss"],
})
export class PurcharseCreateComponent implements OnInit {
  providerSelec: SelectAutoComplete[];
  warehouseSelec: SelectAutoComplete[];

  constructor(
    private _providerSelectService: ProviderSelectService,
    private _warehouseSelectService: WarehouseSelectService
  ) {}

  ngOnInit(): void {}

  listSelectProviders(): void {
    this._providerSelectService
      .listSelectProviders()
      .subscribe((resp) => (this.providerSelec = resp));
  }

  listSelectWarehouse(): void {
    this._warehouseSelectService
      .listSelectWarehouses()
      .subscribe((resp) => (this.warehouseSelec = resp));
  }
}
