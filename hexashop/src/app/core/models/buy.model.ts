export interface BuyProducts {
  name: string;
  phone: string;
  list: Product[],
  totalPrice: number;
}

export interface Product {
  name: string;
  amount: number;
  price: number;
}
