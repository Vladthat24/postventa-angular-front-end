import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { scaleFadeIn400ms } from "src/@vex/animations/scale-fade-in.animation";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { getEsPaginatorIntl } from "@shared/paginator-intl/es-paginator-intl";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { DefaultService } from "@shared/services/default.service";
import {
  TableColumns,
  TableFooter,
} from "../../../models/list-table-interface";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { AlertService } from "@shared/services/alert.service";
import { startWith, switchMap } from "rxjs/operators";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { IconModule } from "@visurel/iconify-angular";

@Component({
  selector: "app-list-table",
  standalone: true,
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    IconModule,
    MatPaginatorModule
  ],
  templateUrl: "./list-table.component.html",
  styleUrls: ["./list-table.component.scss"],
  animations: [scaleFadeIn400ms, fadeInUp400ms],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getEsPaginatorIntl(),
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearence: "standard" as MatFormFieldDefaultOptions },
    },
  ],
})
export class ListTableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @Input() service?: DefaultService;
  @Input() columns?: TableColumns<T>[];
  @Input() getInpus: any;
  @Input() sortBy?: string;
  @Input() sortDir: string = "asc";
  @Input() footer: TableFooter<T>[] = [];

  @Output() rowClick = new EventEmitter<T>();

  //cuando se detecta un cambio, busca un elemento
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  changesGetInput = new EventEmitter<T>();

  dataSource = new MatTableDataSource<T>();

  //Array para columnas
  visibleColumns?: Array<keyof T | string>;

  //Array para pie de pagina
  visableFooter?: Array<keyof T | string | object>;

  paginatorOptions = {
    pageSizeOptions: [10, 20, 50],
    pageSize: 20,
    pageLength: 0,
  };

  constructor(
    private _spinner: NgxSpinnerService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.setVisibleColumns();
    }

    if (changes.getInpus && this.paginator) {
      this.paginator.pageIndex = 0;
      this.changesGetInput.emit();
    }
  }

  setVisibleColumns() {
    this.visibleColumns = this.columns
      .filter((columns: any) => columns.visible)
      .map((columns: any) => columns.property);
  }

  ngAfterViewInit(): void {
    this.getDataByService();
    this.sortChanges();
    this.paginatorChanges();
  }

  async getDataByService() {
    this.changesGetInput.pipe(
        startWith(""),
        switchMap(() => {
          this._spinner.show("modal-table")
          return this.service.GetAll(
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.getInpus
          );
        })
      ).subscribe((data: any) => {
        this.setData(data);
        this._spinner.hide("modal-table");
      });
  }

  setData(data: any) {
    if (data.isSuccess) {
      this.setVisibleColumns();
      this.paginatorOptions.pageLength = data.data.totalRecords;
      this.dataSource.data = data.data.items;
      if (data.data.footer) this.setFooter(data.data.footer);
    } else {
      this._alert.warn("Atención", "Ha ocurdido un error al cargar los datos");
    }
  }

  setFooter(data: any) {
    this.visableFooter = [];
    if (this.footer.length && data) {
      this.footer.forEach((e) => {
        this.visableFooter.push({
          label: e.label,
          value: data[e.property],
          tooltip: e.tooltip,
        });
      });
    }
  }

  sortChanges() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.changesGetInput.emit();
    });
  }

  paginatorChanges() {
    this.paginator.page.subscribe(() => {
      this.changesGetInput.emit();
    });
  }
}
