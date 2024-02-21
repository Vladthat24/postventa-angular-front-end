import { Component, OnInit } from "@angular/core";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { PurcharseService } from "../../services/purcharse.service";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { MatDialog } from "@angular/material/dialog";
import { componentSettings } from "./purcharse-list-config";
import { DateRange, FiltersBox } from "@shared/models/seach-options-interface";

@Component({
  selector: "vex-purcharse-list",
  templateUrl: "./purcharse-list.component.html",
  styleUrls: ["./purcharse-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class PurcharseListComponent implements OnInit {
  component;
  constructor(
    customTitle: CustomTitleService,
    public _purcharseService: PurcharseService,
    private _dialog: MatDialog
  ) {
    customTitle.set("Compras");
  }

  ngOnInit(): void {
    this.component = componentSettings;
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

  setGetInputsPurcharse(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Purcharse?Download=true`;
  }
}
