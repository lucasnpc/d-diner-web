export interface PurchaseRequest {
    productName: string,
    currentStock: number;
    measurementUnit: string
    selected: boolean
}