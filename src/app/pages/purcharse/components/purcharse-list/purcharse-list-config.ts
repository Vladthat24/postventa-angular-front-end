import { SearchOptions } from "@shared/models/seach-options-interface";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ProductDetailsResponse, PurcharResponse } from "../../models/purcharse-response.interface";
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

const searchOptionsProducts:SearchOptions[]=[
  {
    label: "Código",
    value: 1,
    placeholder: "Buscar por Código",
    validation: [GenericValidators.alphanumeric],
    validation_desc: "Sólo se permite correos válidos",
    icon: "icName",
  },
  {
    label: "Nombre",
    value: 2,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda",
    icon: "icName",
  }
]

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

const tableColumnsProducts: TableColumns<ProductDetailsResponse>[]=[
  {
    label: "",
    cssLabel: ["font-bold", "text-xxs"],
    property: "image",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "image",
    sticky: true,
    sort: true,
    sortProperty: "image",
    visible: true,
    download: true,
  },
  {
    label: "Código",
    cssLabel: ["font-bold", "text-xxs"],
    property: "code",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "textUppercase",
    sticky: false,
    sort: true,
    sortProperty: "code",
    visible: true,
    download: true,
  },
  {
    label: "Nombre",
    cssLabel: ["font-bold", "text-xxs"],
    property: "name",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    subProperty:"category",
    cssSubProperty: ["text-xxs", "text-am-gray","uppercase", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "Cantidad",
    cssLabel: ["font-bold", "text-xxs"],
    property: "quantity",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "quantityPurcharse",
    sticky: false,
    sort: true,
    sortProperty: "quantity",
    visible: true,
    download: true,
  },
  {
    label: "Precio U.",
    cssLabel: ["font-bold", "text-xxs"],
    property: "unitPurcharsePrice",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "unitPurcharsePrice",
    sticky: false,
    sort: true,
    sortProperty: "unitPurcharsePrice",
    visible: true,
    download: true,
  },
  {
    label: "Total",
    cssLabel: ["font-bold", "text-xxs"],
    property: "totalAmount",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "totalAmount",
    sticky: false,
    sort: true,
    sortProperty: "totalAmount",
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icAdd",
    cssProperty: [],
    type: "icon",
    action: "addDetail",
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
  tableColumnsProducts,
  initialSort: "Id",
  initalSortDir: "desc",
  getInputs,
  //SEARCH FILTROS
  searchOptions,
  searchOptionsProducts,
  filters: filters,
  resetFilters,
  filename: "listado-de-compras",
};
