import { TableColumns } from "@shared/models/list-table-interface";
import { MenuItems } from "@shared/models/menu-items.interfaces";
import { SearchOptions } from "@shared/models/seach-options-interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ProviderResponse } from "../../models/provider-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Nombre",
    value: 1,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda",
    icon: "icName",
  },
  {
    label: "Email",
    value: 2,
    placeholder: "Buscar por Email",
    validation: [GenericValidators.emailValidation],
    validation_desc: "Sólo se permite correos válidos",
    icon: "icMail",
  },
  {
    label: "N° Documento",
    value: 3,
    placeholder: "Buscar por N° Documento",
    validation: [GenericValidators.document],
    validation_desc: "Sólo se permite documentos válidos",
    icon: "icDescription",
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

const tableColumns: TableColumns<ProviderResponse>[] = [
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
    label: "Email",
    cssLabel: ["font-bold", "text-sm"],
    property: "email",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "email",
    visible: true,
    download: true,
  },
  {
    label: "Tipo de Documento",
    cssLabel: ["font-bold", "text-sm"],
    property: "documentType",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "documentType",
    visible: true,
    download: true,
  },
  {
    label: "N° de Documento",
    cssLabel: ["font-bold", "text-sm"],
    property: "documentNumber",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "documentNumber",
    visible: true,
    download: true,
  },
  {
    label: "Dirección",
    cssLabel: ["font-bold", "text-sm"],
    property: "address",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "address",
    visible: true,
    download: true,
  },
  {
    label: "Teléfono",
    cssLabel: ["font-bold", "text-sm"],
    property: "phone",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "phone",
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
    property: "stateProvider",
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
  refresh:false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  stateDate: null,
  endDate: null,
  refresh:false,
};

const getInputs:string="";

export const componentSettings = {
  icProvider: IconsService.prototype.getIcon("icProvider"),
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
  datesFilterArray: ["Fecha de creación"],
  filename:"listado-de-provider",
  columnsFilter: tableColumns.map((column) => {
    return {
      label: column.label,
      property: column.property,
      type: column.type,
    };
  }),
};
