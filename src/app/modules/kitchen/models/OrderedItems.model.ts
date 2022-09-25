export interface OrderedItems {
    id: String
    observations: String
    placedItems: { [key: string]: number }
    status: String
}