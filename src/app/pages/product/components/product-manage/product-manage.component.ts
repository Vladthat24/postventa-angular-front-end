import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelectAutoComplete } from "@shared/models/select-autocomplete.interface";
import { AlertService } from "@shared/services/alert.service";
import { IconsService } from "@shared/services/icons.service";
import { statesSelect } from "src/static-data/configs";
import { ProductService } from "../../services/product.service";
import { CategorySelectService } from "@shared/services/category-select.service";

@Component({
  selector: "vex-product-manage",
  templateUrl: "./product-manage.component.html",
  styleUrls: ["./product-manage.component.scss"],
})
export class ProductManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = statesSelect;
  mode: string = "";
  categorySelect: SelectAutoComplete[];
  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      productId: [0, [Validators.required]],
      code: ["", [Validators.required]],
      name: ["", [Validators.required]],
      stockMin: [0, [Validators.required]],
      stockMax: [0, [Validators.required]],
      image: [""],
      unitSalePrice: [0, [Validators.required]],
      categoryId: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductService,
    public _dialogRef: MatDialogRef<ProductManageComponent>,
    private _categorySelectServer: CategorySelectService
  ) {
    this.mode = data.mode;
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectCategories();
    if(this.data.mode=="edit"){
      this.productById(this.data.dialogConfig.data.productId);
    }
  }

  productById(productId:number):void{
    console.log("productId:",productId);
    this._productService.productById(productId).subscribe((resp)=>{
      console.log("resp:",resp);
      this.form.reset({
        productId:resp.productId,
        code:resp.code,
        name:resp.name,
        stockMin:resp.stockMin,
        stockMax:resp.stockMax,
        image:resp.image,
        unitSalePrice:resp.unitSalePrice,
        categoryId:resp.categoryId,
        state:resp.state,
      });
    });
  }

  listSelectCategories():void{
    this._categorySelectServer.listSelectCategories().subscribe
    ((resp)=>{
      this.categorySelect=resp;
    })
  }
  selectImage(file:File){
    this.form.get('image').setValue(file);
  }

  productSave():void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls)=>{
        controls.markAllAsTouched();
      })
    }

    const productId=this.form.get("productId").value;
    if(productId>0){
      this.productEdit(productId);
    }else{
      this.productRegister();
    }
  }

  productRegister():void{
    this._productService.productRegister(this.form.value).subscribe(
      (resp)=>{
        if(resp.isSuccess){
          this._alert.success("Excelente",resp.message);
          this._dialogRef.close(true);
        }else{
          this._alert.warn("Atención",resp.message);
        }
      }
    )
  }

  productEdit(productId:number):void{
    this._productService.productEdit(productId,this.form.value).subscribe(
      (resp)=>{
        if(resp.isSuccess){
          this._alert.success("Excelente",resp.message);
          this._dialogRef.close(true);
        }else{
          this._alert.warn("Atención",resp.message);
        }
      }
    )
  }


}
