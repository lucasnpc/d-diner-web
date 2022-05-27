export class Product {
    productId: number | undefined;
    productName: string = '';
    minimumStock: number = 0;
    maximumStock: number = 0;
    currentStock: number = 0;
    measurementUnit: string = '';
    businessCnpj: string | undefined;
    barcode: string | undefined;
    productBatch: string | undefined;
    costValue: number = 0;
    providerCnpj: string = '';
    selected: boolean | undefined;
}