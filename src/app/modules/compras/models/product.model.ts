export class Product {
    productId: number | undefined;
    productName: string = '';
    minimumStock: number = 0;
    currentStock: number = 0;
    measurementUnit: string = '';
    businessCnpj: string | undefined;
    barcode: string | undefined;
    selected: boolean | undefined;
}