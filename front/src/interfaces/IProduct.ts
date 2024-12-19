export interface IProduct {
  id: number;
  owner: string;
  active: boolean;
  title: string;
  description: string;

  state: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  capacity: number;
  photos: string[];
  checkin: string;
  checkout:string;
  rating: number;
}

export interface IProductListProps {
  products: IProduct[];
}
