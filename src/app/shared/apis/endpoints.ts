import { HttpHeaders } from "@angular/common/http"

export const endpoint={
    //CATEGORY MODULE
    LIST_CATEGORIES: "Category",
    LIST_SELECT_CATEGORIES: 'Category/Select',
    CATEGORY_BY_ID:'Category/',
    CATEGORY_REGISTER:'Category/Register/',
    CATEGORY_UPDATE: 'Category/Edit/',
    CATEGORY_REMOVE:'Category/Remove/',

    //Auth Module
    LOGIN:"Auth/Generate/Login",
    LOGIN_GOOGLE:"Auth/Generate/LoginWithGoogle",

    //Proveedores
    LIST_PROVIDERS:"Provider",
    PROVIDER_REGISTER:"Provider/Register/",
    PROVIDER_EDIT:"Provider/Edit/",
    PROVIDER_BY_ID:"Provider/",
    PROVIDER_REMOVE:"Provider/Remove/",

    //DocumentType
    LIST_DOCUMENT_TYPES:"DocumentType"

}

export const httpOptions={
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
}