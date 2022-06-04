export interface PurchaseRequest {
    productId: number | undefined,
    productName: string,
    currentStock: number;
}