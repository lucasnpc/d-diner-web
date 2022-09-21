export interface KitchenInfo{
    deskId: string
    deskDescription: string
    id: String
    observations: String
    placedItems: { [key: string]: number }
    status: String
}