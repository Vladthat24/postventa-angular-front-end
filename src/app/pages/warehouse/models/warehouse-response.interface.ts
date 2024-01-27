export interface WarehouseResponse{
    warehouseId:string;
    name: string;
    auditCreateDate:Date;
    state: number;
    stateWarehouse:string;
    badgeColor:string;
    icEdit:object;
    icDelete:object;
}