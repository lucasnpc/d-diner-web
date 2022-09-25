export interface KitchenInfo{
    deskId: string
    deskDescription: string
    orderId: string
    id: string
    observations: string
    placedItems: { [key: string]: number }
    status: string
}