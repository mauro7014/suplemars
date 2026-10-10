export type ProductCategory =
  | 'proteinas'
  | 'creatinas'
  | 'pre-entreno'
  | 'colageno'
  | 'quemadores'
  | 'aminoacidos'
  | 'barritas'
  | 'varios'

export type ProductMaterial =
  | 'suero de leche'
  | 'creatina monohidrato'
  | 'multi-ingrediente'
  | 'aminoacidos'
  | 'colageno hidrolizado'
  | 'cafeina y termogenicos'
  | 'avena y proteina'
  | 'varios'

export interface ProductSize {
  label: string
  available: boolean
}

export interface Product {
  id:           string
  name:         string
  subtitle:     string
  description:  string
  price:        number
  currency:     string
  category:     ProductCategory
  material:     ProductMaterial
  sizes:        ProductSize[]
  images:       string[]
  tags:         string[]
  isNew:        boolean
  isBestseller: boolean
  stock:        number
}

export interface CartItem {
  product:      Product
  selectedSize: string
  quantity:     number
}

export type CartAction =
  | { type: 'ADD_ITEM';    payload: { product: Product; size: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string } }
  | { type: 'UPDATE_QTY';  payload: { productId: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }

export interface CartState {
  items:  CartItem[]
  isOpen: boolean
}

export interface ModalState {
  isOpen:    boolean
  productId: string | null
}

export type PaymentMethod = 'visa' | 'mastercard' | 'amex' | 'mercadopago' | 'paypal'
