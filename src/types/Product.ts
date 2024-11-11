
export interface Product {
  idProduct: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  categoryId: number;
}