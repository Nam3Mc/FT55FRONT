import { IAmenities } from "./IAmenities";
import { IAccount } from "./IAccount";

export interface IProperty {
  id: string;
  account_: IAccount;
  isActive: boolean;
  name: string;
  description: string;
  type: string;
  country:string;
  state: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  capacity: number;
  photos?: string[];
  image_?: { id: string; url: string }[];
  rating: number;
  hasMinor: boolean;
  pets: boolean;
  amenities_: IAmenities;
  latitude: string;
  longitude: string
}

export interface IPropertyList {
  properties: IProperty[];
}
