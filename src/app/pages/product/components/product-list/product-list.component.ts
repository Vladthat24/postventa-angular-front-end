import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { ProductService } from "../../services/product.service";
import { MatDialog } from "@angular/material/dialog";
import { componentSettings } from "./product-list-config";
import { DateRange, FiltersBox } from "@shared/models/seach-options-interface";
import { ProductManageComponent } from "../product-manage/product-manage.component";
import { ProductResponse } from "../../models/product-response.interface";
import { RowClick } from "@shared/models/row-click.interface";

@Component({
  selector: "vex-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ProductListComponent implements OnInit {
  component;
  constructor(
    customTitle: CustomTitleService,
    public _productService: ProductService,
    private _dialog: MatDialog
  ) {
    customTitle.set("Productos");
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
      .open(ProductManageComponent, {
        disableClose: true,
        width: "400px",
        data:{mode:"register"}
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsProduct(true);
        }
      });
  }

  rowClick(rowClick: RowClick<ProductResponse>) {
    let action = rowClick.action;
    let product = rowClick.row;

    switch (action) {
      case "edit":
        this.productEdit(product);
        break;
      case "remove":
        this.productRemove(product);
        break;
      case "view":
        this.productInfoWarehouse(product);
    }
    return false;
  }
  
  productEdit(productData:ProductResponse){

  }

  productRemove(productData: ProductResponse){

  }

  productInfoWarehouse(productData: ProductResponse){

  }


  setGetInputsProduct(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Product?Download=true`;
  }
}
