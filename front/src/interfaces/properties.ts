
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
  name: string;
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
  latitude: string;
  longitude: string;
  isActive: boolean;
  type: string;

  // Agregar amenities_
  amenities_?: {
    wifi: boolean;
    tv: boolean;
    airConditioning: boolean;
    piscina: boolean;
    parqueadero: boolean;
    cocina: boolean;
  };

  // Asegúrate de que la propiedad 'image_' también esté definida si no lo está
  image_?: {
    id: string;
    url: string;
  }[];
}
