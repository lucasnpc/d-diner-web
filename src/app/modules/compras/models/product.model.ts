export interface Product {
    id: string;
    name: string;
    minimumStock: number;
    currentStock: number;
    measurementUnit: string;
    barcode: string;
    selected: boolean;
}