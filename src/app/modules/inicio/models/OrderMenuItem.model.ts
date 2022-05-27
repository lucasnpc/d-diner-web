export class ItemRequest {
    itemId: number | undefined;
    quantity: number | undefined;
}

export class ClientOrdersItems {
    clientOrderId: number | undefined;
    itemId: number | undefined;
    itemQuantity: number | undefined;
    orderStatus: string = '';
}