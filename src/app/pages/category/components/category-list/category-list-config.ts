import { CategoryResponse } from "src/app/pages/category/models/category-response.interface";
import icCategory from "@iconify/icons-ic/twotone-category";
import icViewHeadLine from "@iconify/icons-ic/twotone-view-headline";
import icLabel from "@iconify/icons-ic/twotone-label";
import { GenericValidators } from "@shared/validators/generic-validators";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import { TableColumns } from "@shared/models/list-table-interface";
import { SearchOptions } from "@shared/models/seach-options-interface";
import { MenuItems } from "@shared/models/menu-items.interfaces";

const searchOptions: SearchOptions[] = [
    {
        label: "Nombre",
        value: 1,
        placeholder: "Buscar por Nombre",
        validation: [GenericValidators.defaultName],
        validation_desc: "Sólo se permite letras en esta búsqueda",
        icon: "icName"

    },
    {
        label: "Descripción",
        value: 2,
        placeholder: "Buscar por Descripción",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "Sólo se permite letras y números en esta búsqueda",
        icon: "icDescription"
    }
];

const menuItems: MenuItems[] = [
    {
        type: "link",
        id: "all",
        icon: icViewHeadLine,
        label: "Todos"
    },
    {
        type: "link",
        id: "Activo",
        value: 1,
        icon: icLabel,
        label: "Activo",
        class: {
            icon: "text-green"
        }
    },
    {
        type: "link",
        id: "Inactivo",
        value: 0,
        icon: icLabel,
        label: "Inactivo",
        class: {
            icon: "text-gray"
        }
    }
]
const tableColumns: TableColumns<CategoryResponse>[] = [
    {
        label: "Nombre",
        cssLabel:["font-bold","text-sm"],
        property: "name",
        cssProperty:["font-semibold","text-sm","text-left"],
        type: "text",
        sticky:true,
        sort:true,
        sortProperty:"name",
        visible:true,
        download:true
    },
    {
        label: 'Descripcion',
        property: "description",
        cssLabel:["font-bold","text-sm"],
        cssProperty:["font-semibold","text-sm","text-left"],
        type: "text",
        sticky:false,
        sort:true,
        sortProperty:"description",
        visible:true,
        download:true
    },
    {
        label: "F. Creación",
        property: "auditCreateDate",
        cssLabel:["font-bold","text-sm"],
        cssProperty:["font-semibold","text-sm","text-left"],
        type: "datetime",
        sticky:false,
        sort:true,
        visible:true,
        download:true
    },
    {
        label: "Estado",
        property: "stateCategory",
        cssLabel:["font-bold","text-sm"],
        cssProperty:["font-semibold","text-sm","text-left"],
        type: "badge",
        sticky:false,
        sort:false,
        visible:true,
        download:true
    },
    {
        label:"",
        cssLabel:[],
        property:"icEdit",
        cssProperty:[],
        type:"icon",
        action:"edit",
        sticky:false,
        sort:false,
        visible:true,
        download:false
    },
    {
        label:"",
        cssLabel:[],
        property:"icDelete",
        cssProperty:[],
        type:"icon",
        action:"remove",
        sticky:false,
        sort:false,
        visible:true,
        download:false
    }
]

const filters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    stateDate: null,
    endDate: null,
    refresh:false,
}
const resetFilters = {
    numFilter: 0,
    textFilter: "",
    stateFilter: null,
    stateDate: null,
    endDate: null,
    refresh:false,
}

const getInputs:string ="";

export const componentSettings = {
    //ICONS
    icCategory: icCategory,
    icCalendarMonth:icCalendarMonth,
    //LAYOUT SETTINGS
    menuOpen: false,
    //TABLE SETTINGS
    tableColumns: tableColumns,
    initialSort: "Id",
    initalSortDir: "desc",
    getInputs,
    buttonLabel: "EDITAR",
    buttonLabel2: "ELIMINAR",
    //SEARCH FILTROS
    menuItems: menuItems,
    searchOptions:searchOptions,
    filters_dates_active: false,
    filters: filters,
    resetFilters:resetFilters,
    datesFilterArray:['Fecha de creación'],
    filename:"listado-de-categorias",
    columnsFilter: tableColumns.map((column) => {
        return {
            label: column.label,
            property: column.property,
            type: column.type
        }
    })
}