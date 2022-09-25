export interface MenuItem {
  id: string
  category: string
  description: string
  price: number

  //Not saved data
  itemQuantity: number
  selected: boolean
}
