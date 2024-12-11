export interface IProduct {
  id: number;
  title: string;
  description: string;
  location: string;
  rooms: number;
  guests: number;
  price: number;
  image: string;
  isAvailable: boolean;
}

export interface IProductListProps {
  products: IProduct[];
}
