
// export interface IPropiedad {
//   rating: number;
//   id: string;
//   owner: IUser;
//   active: boolean;
//   title: string;
//   description: string;
//   hasMinor: boolean,
//   state?: string;        
//   city?: string;            
//   price?: number[];          
//   bedrooms?: number[];       
//   bathrooms: number;
//   isAvailable: boolean;
//   capacity?: number;         
//   photos: string[];
//   stripeProductId?: string;
//   stripePriceId?: string;
//   reviews: IReview[];
//   reservationDetail: IReservationDetail;
//   latitude: any;
//   longitude: any;
//   address: string,
//   pets: boolean;
//   accountId: string;
//   image_: { url: string }[]; 
//   wifi: boolean,
//   tv: boolean,
//   airConditioning: boolean,
//   piscina: boolean,
//   parqueadero: boolean,
//   cocina: boolean,
//   isActive: boolean,
//   type: string,
// }

export interface IPropiedad {
  address?: string;
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  state?: string;
  city: string;
  capacity: number;
  rating: number;
  hasMinor: boolean;
  pets: boolean;
  latitude: number;
  longitude: number;
  isActive: boolean;
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
