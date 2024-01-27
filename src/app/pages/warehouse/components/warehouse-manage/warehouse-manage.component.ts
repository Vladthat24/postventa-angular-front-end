import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { DocumentTypeService } from '@shared/services/document-type.service';
import { IconsService } from '@shared/services/icons.service';
import { statesSelect } from 'src/static-data/configs';
import { WarehouseService } from '../../service/warehouse.service';

@Component({
  selector: 'vex-warehouse-manage',
  templateUrl: './warehouse-manage.component.html',
  styleUrls: ['./warehouse-manage.component.scss']
})
export class WarehouseManageComponent implements OnInit {

  icClose= IconsService.prototype.getIcon("icClose");
  configs= statesSelect;
  form:FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      warehouseId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _warehouseService: WarehouseService,
    public _dialogRef: MatDialogRef<WarehouseManageComponent>,
    private _documentTypeService: DocumentTypeService
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
  }

  providerSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const warehouseId = this.form.get("warehouseId").value;
    if (warehouseId > 0) {
      this.warehouseEdit(warehouseId);
    } else {
      this.warehouseRegister();
    }
  }

  warehouseRegister(): void {
    this._warehouseService
      .warehouseRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atención", resp.message);
        }
      });
  }

  warehouseEdit(providerId: number): void {
    this._warehouseService
      .providerEdit(providerId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        }
      });
  }
}
