export interface ItemRequest {
    itemId: number;
    quantity: number;
}

export interface ClientOrdersItems {
    clientOrderId: number;
    itemId: number;
    itemQuantity: number;
    orderStatus: string;
}