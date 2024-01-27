import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoints";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { WarehouseResponse } from "../models/warehouse-response.interface";
import { getIcon } from "@shared/functions/helpers";

@Injectable({
  providedIn: "root",
})
export class WarehouseService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_WAREHOUSE
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp) => this.transformWarehouseData(resp)));
  }

  private transformWarehouseData(response: BaseResponse): BaseResponse {
    const badgeColor: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((warehouse: WarehouseResponse) => {
      warehouse.badgeColor =
        badgeColor[warehouse.state] || "text-gray bg-gray-light";
      warehouse.icEdit = getIcon("icEdit", "Editar Almacen", true);
      warehouse.icDelete = getIcon("icDelete", "Eliminar Almacen", true);
    });

    return response;
  }


  
}
