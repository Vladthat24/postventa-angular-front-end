import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconsService } from "@shared/services/icons.service";
import { DownloadXslxService } from "@shared/services/download-xslx.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { IconsModule } from "@shared/import-modules/icons.module";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-export-excel",
  standalone: true,
  imports: [CommonModule,IconsModule,MatButtonModule,MatToolbarModule,MatTooltipModule],
  templateUrl: "./export-excel.component.html",
  styleUrls: ["./export-excel.component.scss"],
})
export class ExportExcelComponent implements OnInit {
  icCloudDownload = IconsService.prototype.getIcon("icCloudDownload");

  @Input() url: string = null;
  @Input() getInputs: string = null;
  @Input() filename: string = null;

  infoToolTip = "Descargar resultado en formato Excel.";

  constructor(
    public _downloadXslsService: DownloadXslxService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  download() {
    Swal.fire({
      title: `Confirmar`,
      text: "Esta accion descargará los registros en formato .xlxs ignorando la paginación",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210,155,253)",
      cancelButtonColor: "rgb(79,109,253)",
      confirmButtonText: "Sí, Descargar",
      cancelButtonText: "Cancelar",
      width: "430",
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeDownload();
      }
    });
  }

  executeDownload() {
    this._spinner.show();
    this._downloadXslsService
      .executeDownload(this.url + this.getInputs)
      .subscribe((excelData: Blob) => {
        const filename = this.filename;
        const blobUrl = URL.createObjectURL(excelData);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = filename;
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);

        this._spinner.hide();
      });
  }
}
