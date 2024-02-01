import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { endpoint } from "@shared/apis/endpoints";
import { map } from "rxjs/operators";
import { getIcon } from "@shared/functions/helpers";
import { ProductResponse } from "../models/product-response.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}


  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_PRODUCTS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${page + 1}${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.forEach(function (product: ProductResponse) {
          switch (product.state) {
            case 0:
              product.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              product.badgeColor = "text-green bg-green-light";
              break;
            default:
              product.badgeColor = "textr-gray  bg-gray-light";
          }
          product.icView=getIcon("icVisibility","Ver Stock Actual",true);
          product.icEdit = getIcon("icEdit", "Editar Producto", true);
          product.icDelete = getIcon(
            "icDelete",
            "Eliminar Producto",
            true
          );
        });
        return resp;
      })
    );
  }
}
