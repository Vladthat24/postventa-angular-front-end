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
    LOGIN:"Auth/Login",
    LOGIN_GOOGLE:"Auth/LoginWithGoogle"
}

export const httpOptions={
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
}