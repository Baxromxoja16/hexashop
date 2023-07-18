export interface Categories {
  img: string;
  name: string;
  _id: string;
  subCategories: SubCategory[];
}

// export interface SubCategory {
//   category: string;
//   _id: string;
// }

export class SubCategory {
  constructor(public category: string){}
}
