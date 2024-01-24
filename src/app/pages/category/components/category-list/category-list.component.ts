import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { CategoryService } from 'src/app/pages/category/services/category.service';
import { componentSettings } from './category-list-config';
import { DatesFilter } from '@shared/functions/actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryManageComponent } from '../category-manage/category-manage.component';
import Swal from 'sweetalert2';
import { FiltersBox, SearchOptions } from '@shared/models/seach-options-interface';
import { CategoryResponse } from '../../models/category-response.interface';
import {DateRange} from "../../../../shared/models/seach-options-interface";



@Component({
  selector: 'vex-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class CategoryListComponent implements OnInit {

  component

  constructor(
    customTitle: CustomTitleService,
    public _categoryService: CategoryService,
    public _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.component = componentSettings
  }

  rowClick(e: any) {
    let action = e.action
    let category = e.row

    switch (action) {
      case "edit":
        this.CategoryEdit(category)
        break
      case "remove":
        this.CategoryRemove(category)
        break
    }
    return false
  }

  setData(value: any) {
    this.component.filters.stateFilter = value
    /* this.component.menuOpen = false */
    this.formatGetInputs()
  }

  //Metodo para poder filtrar
  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchData
    this.formatGetInputs()
  }
  
  searchDateRange(date: DateRange){
    this.component.filters.startDate =date.startDate;
    this.component.filters.endDate=date.endDate;
    this.formatGetInputs()
  }

  resetFilters(){
    this.component.filters={ ...this.component.resetFilters}
    this.formatGetInputs()
  }

  //Filter por fechas inicio y fin
  datesFilterOpen() {
    DatesFilter(this)
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
    if (this.component.filters.startDate !=null && this.component.filters.endDate != null) {
      str+=`&startDate=${this.component.filters.startDate}`;
      str+=`&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
    this.component.getInputs = str;
  }



  //Abrir un nuevo dialog para registrar una nueva categoria
  openDialogRegister() {
    this._dialog.open(CategoryManageComponent, {
      disableClose: true,
      width: '400px'
    }).afterClosed().subscribe(
      (res) => {
        if (res) {
          this.setGetInputsProviders(true);
        }
      }
    )
  }

  CategoryEdit(row: CategoryResponse) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row;

    let dialogRef = this._dialog.open(CategoryManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.setGetInputsProviders(true);
        }
      }
    )
  }

  CategoryRemove(category: any) {
    Swal.fire({
      title: `¿Realmente deseas eliminar la categoria ${category.name}`,
      text: "Se borrará de forma permanente",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: 'rgb(210,155,253)',
      cancelButtonColor: 'rgb(79,109,253)',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      width: "430"
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoryService.CategoryRemove(category.categoryId)
          .subscribe(() => this.setGetInputsProviders(true));
      }
    })
  }

  setGetInputsProviders(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }
  
  get getDownloadUrl(){
    return `Category?Download=true`;
  }

}
