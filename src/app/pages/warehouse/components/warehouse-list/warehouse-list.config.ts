import { TableColumns } from "@shared/models/list-table-interface";
import { MenuItems } from "@shared/models/menu-items.interfaces";
import { SearchOptions } from "@shared/models/seach-options-interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { WarehouseResponse } from "../../models/warehouse-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Nombre",
    value: 1,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda",
    icon: "icName",
  },
];

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadLine"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumns<WarehouseResponse>[] = [
  {
    label: "Nombre",
    cssLabel: ["font-bold", "text-sm"],
    property: "name",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: true,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "F. Creación",
    property: "auditCreateDate",
    cssLabel: ["font-bold", "text-sm"],
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "Estado",
    property: "stateWarehouse",
    cssLabel: ["font-bold", "text-sm"],
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  stateDate: null,
  endDate: null,
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  stateDate: null,
  endDate: null,
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  icWarehouse: IconsService.prototype.getIcon("icWarehouse"),
  //LAYOUT SETTINGS

  //TABLE SETTINGS
  tableColumns,
  initialSort: "Id",
  initalSortDir: "desc",
  getInputs,
  //SEARCH FILTROS
  menuItems,
  searchOptions,
  filters: filters,
  resetFilters,
  filename: "listado-de-almacenes",
};
