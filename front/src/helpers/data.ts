import { IProduct } from "@/interfaces/IProduct";
export interface user {
  name: string;
  lastName: string;
  birthdate: string;
  phone: string;
  email: string;
  id: string;
  photo: string;
  registeredAt: string;
  active: boolean;
  nationality: string;
  dni: string;
  DOB: string;
  employmentStatus: string;
}

export const productsToPreLoad: IProduct[] = [
  {
    id: 1,
    owner: "Juan Pérez",
    active: true,
    title: "Casa frente al mar en la Riviera Maya",
    description:
      "Disfruta de un paraíso tropical en esta casa frente al mar, ubicada en una de las playas más exclusivas de la Riviera Maya. Con vistas panorámicas al océano, amplios espacios y acceso directo a la playa, esta propiedad es perfecta para unas vacaciones de ensueño. Incluye una cocina completamente equipada, áreas comunes elegantes y una terraza para disfrutar del amanecer.",
    state: "Quintana Roo",
    city: "Playa del Carmen",
    price: 300,
    bedrooms: 4,
    bathrooms: 3,
    isAvailable: true,
    capacity: 8,
    photos: [
      "/images/casa1.jpg",
      "/images/dentro1.jpg",
    ],
    checkin: "2024-12-20",
    checkout: "2024-12-27",
    rating: 4.8,
  },
  {
    id: 2,
    owner: "Mariana Silva",
    active: true,
    title: "Apartamento moderno en el centro histórico",
    description:
      "Este apartamento combina estilo moderno con la riqueza cultural del centro histórico de Bogotá. Perfecto para parejas o viajeros en busca de comodidad, ofrece muebles elegantes, Wi-Fi de alta velocidad y una vista única de los icónicos edificios coloniales. Ubicado cerca de restaurantes, museos y cafés bohemios.",
    state: "Cundinamarca",
    city: "Bogotá",
    price: 150,
    bedrooms: 2,
    bathrooms: 1,
    isAvailable: true,
    capacity: 4,
    photos: [
      "/images/casa2.jpg",
      "/images/dentro2.jpg",
    ],
    checkin: "2024-12-15",
    checkout: "2024-12-22",
    rating: 4.6,
  },
  {
    id: 3,
    owner: "Carlos García",
    active: true,
    title: "Cabaña rústica en los Andes",
    description:
      "Escápate a esta acogedora cabaña en medio de las montañas andinas. Con una chimenea central, una cocina rústica y vistas espectaculares, es el lugar ideal para desconectar de la rutina y disfrutar de la naturaleza. Ubicada cerca de senderos y cascadas, es perfecta para familias o grupos pequeños que buscan aventura y tranquilidad.",
    state: "Mendoza",
    city: "Uspallata",
    price: 200,
    bedrooms: 3,
    bathrooms: 2,
    isAvailable: true,
    capacity: 6,
    photos: [
      "/images/casa3.jpg",
      "/images/dentro3.jpg",
    ],
    checkin: "2024-12-10",
    checkout: "2024-12-17",
    rating: 4.9,
  },
  {
    id: 4,
    owner: "Camila Rojas",
    active: true,
    title: "Loft de lujo con vistas al puerto",
    description:
      "Este moderno loft ofrece vistas al puerto de Valparaíso y está decorado con un estilo contemporáneo. Perfecto para parejas, cuenta con grandes ventanales, un balcón privado y todas las comodidades para una estancia inolvidable. Su ubicación central te permite explorar la vibrante vida cultural de la ciudad.",
    state: "Valparaíso",
    city: "Valparaíso",
    price: 250,
    bedrooms: 1,
    bathrooms: 1,
    isAvailable: false,
    capacity: 2,
    photos: [
      "/images/casa4.jpg",
      "/images/dentro4.jpg",
    ],
    checkin: "2024-12-05",
    checkout: "2024-12-12",
    rating: 4.7,
  },
  {
    id: 5,
    owner: "Roberto Díaz",
    active: true,
    title: "Casa colonial en el centro de Oaxaca",
    description:
      "Esta casa colonial combina la tradición mexicana con todas las comodidades modernas. Situada en el centro de Oaxaca, está cerca de mercados, iglesias y restaurantes tradicionales. Con patios interiores llenos de luz y decoración típica, es perfecta para quienes desean una experiencia auténtica.",
    state: "Oaxaca",
    city: "Oaxaca de Juárez",
    price: 180,
    bedrooms: 3,
    bathrooms: 2,
    isAvailable: true,
    capacity: 5,
    photos: [
      "/images/casa5.jpg",
      "/images/dentro5.jpg",
    ],
    checkin: "2024-12-08",
    checkout: "2024-12-15",
    rating: 4.5,
  },
  {
    id: 6,
    owner: "Ana López",
    active: true,
    title: "Villa de lujo con piscina en Punta Cana",
    description:
      "Disfruta de una estancia exclusiva en esta villa en Punta Cana. La propiedad cuenta con una piscina privada, un jardín tropical y amplios espacios interiores llenos de luz. Con capacidad para 10 personas, es ideal para grupos grandes o familias que buscan lujo y comodidad a pocos pasos de la playa.",
    state: "La Altagracia",
    city: "Punta Cana",
    price: 500,
    bedrooms: 5,
    bathrooms: 4,
    isAvailable: true,
    capacity: 10,
    photos: [
      "/images/casa6.jpg",
      "/images/dentro6.jpg",
    ],
    checkin: "2024-12-18",
    checkout: "2024-12-25",
    rating: 4.9,
  },
  {
    id: 7,
    owner: "Luis Martínez",
    active: true,
    title: "Casa rural entre viñedos en el Valle de Colchagua",
    description:
      "Ubicada en el famoso Valle de Colchagua, esta casa rural te ofrece una experiencia única rodeada de viñedos. Perfecta para los amantes del vino, la propiedad cuenta con un porche con vistas espectaculares, una cocina completamente equipada y habitaciones acogedoras. Ideal para relajarse y disfrutar de catas de vino locales.",
    state: "O'Higgins",
    city: "Santa Cruz",
    price: 220,
    bedrooms: 2,
    bathrooms: 1,
    isAvailable: false,
    capacity: 4,
    photos: [
      "/images/casa7.jpg",
      "/images/dentro7.jpg",
    ],
    checkin: "2024-12-01",
    checkout: "2024-12-07",
    rating: 4.8,
  },
  {
    id: 8,
    owner: "Sofía Ramírez",
    active: true,
    title: "Apartamento con terraza en Ciudad de México",
    description:
      "Este amplio apartamento ofrece una terraza privada con vistas a los icónicos edificios de Ciudad de México. Con un diseño moderno y elegante, es ideal para grupos pequeños o familias. Disfruta de su cercanía a zonas culturales, restaurantes y museos, todo mientras te relajas en un ambiente cómodo y seguro.",
    state: "Ciudad de México",
    city: "Ciudad de México",
    price: 200,
    bedrooms: 2,
    bathrooms: 2,
    isAvailable: true,
    capacity: 5,
    photos: [
      "/images/casa8.jpg",
      "/images/dentro8.jpg",
    ],
    checkin: "2024-12-12",
    checkout: "2024-12-20",
    rating: 4.7,
  },
  {
    id: 9,
    owner: "Miguel Hernández",
    active: true,
    title: "Penthouse con jacuzzi y vista a la bahía",
    description:
      "Este exclusivo penthouse en Acapulco ofrece lujo y confort con su jacuzzi privado y vistas espectaculares a la bahía. Con tres amplias habitaciones, una cocina gourmet y áreas sociales elegantes, es ideal para unas vacaciones inolvidables. Perfecto para quienes buscan relajarse y disfrutar del sol y el mar.",
    state: "Guerrero",
    city: "Acapulco",
    price: 600,
    bedrooms: 3,
    bathrooms: 3,
    isAvailable: true,
    capacity: 6,
    photos: [
      "/images/casa9.jpg",
      "/images/dentro9.jpg",
    ],
    checkin: "2024-12-22",
    checkout: "2024-12-29",
    rating: 5.0,
  },
];


