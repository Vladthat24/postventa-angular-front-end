import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '@shared/apis/endpoints';
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { SelectAutoComplete } from '@shared/models/select-autocomplete.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WarehouseSelectService {

  constructor(private _http: HttpClient) {}

  listSelectWarehouses(): Observable<SelectAutoComplete[]> {
    const requestUrl = `${env.api}${endpoint.LIST_SELECT_WAREHOUSE}`;
    return this._http
      .get(requestUrl)
      .pipe(map((resp: BaseResponse) => resp.data));
  }
}