export interface Product {
    id: string;
    name: string;
    minimumStock: number;
    currentStock: number;
    measurementUnit: string;
    barcode: string;

    //Not Saved Data
    selected: boolean;
    menuItemQuantity: number;
}