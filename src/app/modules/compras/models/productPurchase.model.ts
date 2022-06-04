export class ProductPurchase {
    purchaseId: number | undefined;
    description: string = '';
    quantityPurchased: number = 0;
    totalCostValue: number = 0;
    productId: number | undefined;
    businessCnpj: string | undefined;
    datePurchased: Date = new Date();
    productBatch: string = '';
    providerCnpj: string = ''
}