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
  id!: string;
  price!: number;
  image!: {
    big: string;
    mid: string;
    small: string;
  };
  stars!: number;
  description!: string;
  color!: string;
  size!: string;
}
