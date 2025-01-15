export default interface IFormData {
  id?: string,
  name: string;
  description: string;
  price: number;
  state?: string;
  city: string;
  country: string;
  address?: string;
  bedrooms: number;
  bathrooms: number;
  capacity: number;
  latitude?: number;
  longitude?: number;
  hasMinor: boolean;
  pets: boolean;
  accountId?: string;
  images: string[]; 
  wifi: boolean,
  tv: boolean,
  airConditioning: boolean,
  piscina: boolean,
  parqueadero: boolean,
  cocina: boolean,
  isActive: string,
  type: string,
}
