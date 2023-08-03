// export interface ProductsType {
//   name: string;
//   price: number;
//   image: {
//     big: string;
//     mid: string;
//     small: string;
//   };
//   stars: number;
//   description: string;
//   color: string;
//   size: string;
// }

export class Products {
  name!: string;
  price!: number;
  description!: string;
  color!: string;
  size!: string;

  _id!: string;
  imageUrls!: string;
  availableAmount!: number;
}

export class Product {
  name!: string;
  price!: number;
  description!: string;
  color!: string;
  size!: string;

  _id!: string;
  imageUrls!: string;
  availableAmount!: number;
  category!: string;
  createdAt!: string;
  updatedAt!: string;
  sold!: number
  rating!: number;
}
