import { Component, OnInit } from "@angular/core";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { WarehouseService } from "../../service/warehouse.service";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { MatDialog } from "@angular/material/dialog";
import { componentSettings } from "./warehouse-list.config";
import { DateRange, FiltersBox } from "@shared/models/seach-options-interface";
import { WarehouseManageComponent } from "../warehouse-manage/warehouse-manage.component";

@Component({
  selector: "vex-warehouse-list",
  templateUrl: "./warehouse-list.component.html",
  styleUrls: ["./warehouse-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class WarehouseListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _warehouseService: WarehouseService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Almacenes");
  }

  ngOnInit(): void {
    this.component = componentSettings;
  }
  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }
  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }
  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  //Concatener todos los filter para enviarlo por queryparams
  formatGetInputs() {
    let str = "";
    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != null &&
      this.component.filters.endDate != null
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(WarehouseManageComponent, {
        disableClose: true,
        width: "400px",
        data: {
          mode: "register",
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsWarehouse(true);
        }
      });
  }

  setGetInputsWarehouse(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Warehouse?Download=true`;
  }
}
