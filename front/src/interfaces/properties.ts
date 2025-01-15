export interface IPropiedad {
  address?: string;
  id: string;
  name: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  country: string;
  description: string;
  state?: string;
  city: string;
  capacity: number;
  rating?: number;
  hasMinor: boolean;
  pets: boolean;
  latitude: number;
  longitude: number;
  isActive: string;
  type: string;
  accountId?: string; 
  images: string[]; 
  wifi: boolean; 
  tv: boolean; 
  airConditioning: boolean; 
  piscina: boolean; 
  parqueadero: boolean; 
  cocina: boolean; 

  account_: {
    role: string;
    id: string;
    password: string; 
  };

  amenities_?: {
    wifi: boolean;
    tv: boolean;
    airConditioning: boolean;
    piscina: boolean;
    parqueadero: boolean;
    cocina: boolean;
  };

  image_?: {
    id: string;
    url: string;
  }[];
}
