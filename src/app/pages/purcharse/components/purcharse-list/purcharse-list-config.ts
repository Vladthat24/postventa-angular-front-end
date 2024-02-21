import { SearchOptions } from "@shared/models/seach-options-interface";
import { GenericValidators } from "@shared/validators/generic-validators";
import { PurcharResponse } from "../../models/purcharse-response.interface";
import { TableColumns } from "@shared/models/list-table-interface";
import { IconsService } from "@shared/services/icons.service";

const searchOptions: SearchOptions[] = [
  {
    label: "Proveedor",
    value: 1,
    placeholder: "Buscar por Provveedor",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite correos válidos",
    icon: "icName",
  },
];

const tableColumns: TableColumns<PurcharResponse>[] = [
  {
    label: "Proveedor",
    cssLabel: ["font-bold", "text-sm"],
    property: "provider",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "provider",
    visible: true,
    download: true,
  },
  {
    label: "Almacén",
    cssLabel: ["font-bold", "text-sm"],
    property: "warehouse",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "warehouse",
    visible: true,
    download: true,
  },
  {
    label: "Monto Total",
    cssLabel: ["font-bold", "text-sm"],
    property: "totalAmount",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "currency",
    sticky: true,
    sort: true,
    sortProperty: "totalAmount",
    visible: true,
    download: true,
  },
  {
    label: "F. Compra",
    cssLabel: ["font-bold", "text-sm"],
    property: "dateOfPurcharse",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: true,
    sort: true,
    sortProperty: "dateOfPurcharse",
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icVisibility",
    cssProperty: [],
    type: "icon",
    action: "viewDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icCancel",
    cssProperty: [],
    type: "icon",
    action: "cancel",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];


const filters = {
    numFilter: 0,
    textFilter: "",
    stateDate: null,
    endDate: null,
    refresh: false,
  };
  
  const resetFilters = {
    numFilter: 0,
    textFilter: "",
    stateDate: null,
    endDate: null,
    refresh: false,
  };

  const getInputs: string = "";

export const componentSettings = {
  icPurcharse: IconsService.prototype.getIcon("icSales"),
  //TABLE SETTINGS
  tableColumns,
  initialSort: "Id",
  initalSortDir: "desc",
  getInputs,
  //SEARCH FILTROS
  searchOptions,
  filters: filters,
  resetFilters,
  filename: "listado-de-compras",
};
