import { IAmenities } from "./IAmenities";
import { IAccount } from "./IAccount";

export interface IProperty {
  id: string;
  account_: IAccount;
  isActive: boolean;
  name: string;
  description: string;

  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  capacity: number;
  photos?: string[];
  image_?: { id: string; url: string }[];
  rating: number;
  type:string,
  hasMinor: boolean;
  pets: boolean
  amenities_: IAmenities
}

export interface IPropertyList {
  properties: IProperty[];
}
