import React, { useEffect, useState } from "react";
import { IPropiedad } from "../../interfaces/properties";
import { FiArrowLeftCircle } from "react-icons/fi";

interface MyPropertiesProps {}

const AllProperties: React.FC<MyPropertiesProps> = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);
  
  const propertiesData = [
    {
      id: 1,
      owner: {
        id: "user1",
        firstname: "Juan",
        lastname: "Pérez",
        birthdate: "1990-01-01",
        phone: "1234567890",
        email: "juan@email.com",
        profileImgUrl: "https://example.com/juan.jpg",
        registeredAt: "2020-01-01",
        active: true,
        reservations: () => {} 
      },
      active: true,
      title: "Casa en la playa",
      description: "Una hermosa casa con vista al mar",
      city: "Cancún",
      price: [150],
      bedrooms: [3],
      bathrooms: 2,
      isAvailable: true,
      capacity: 6,
      photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
      stripeProductId: "stripe_prod_12345",
      stripePriceId: "stripe_price_12345",
      reviews: [
        {
          id: "review1",
          userId: "user1",
          user: {
            id: "user1",
            firstname: "Juan",
            lastname: "Pérez",
            birthdate: "1990-01-01",
            phone: "1234567890",
            email: "juan@email.com",
            profileImgUrl: "https://example.com/juan.jpg",
            registeredAt: "2020-01-01",
            active: true,
            reservations: () => {}  
          },
          property: {
            id: 1,
            owner: {
              id: "user1",
              firstname: "Juan",
              lastname: "Pérez",
              birthdate: "1990-01-01",
              phone: "1234567890",
              email: "juan@email.com",
              profileImgUrl: "https://example.com/juan.jpg",
              registeredAt: "2020-01-01",
              active: true,
              reservations: () => {}  // Método vacío por ahora
            },
            active: true,
            title: "Casa en la playa",
            description: "Una hermosa casa con vista al mar",
            city: "Cancún",
            price: [150],
            bedrooms: [3],
            bathrooms: 2,
            isAvailable: true,
            capacity: 6,
            photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
            stripeProductId: "stripe_prod_12345",
            stripePriceId: "stripe_price_12345",
            reviews: [],
            reservationDetail: {
              userId: "user1",
              id: "res1",
              reservation: {
                id: "res1",
                property: "1",
                location: "Cancún",
                checkIn: "2024-01-01",
                checkOut: "2024-01-07",
                guests: 4,
                state: "confirmed",
                imageUrl: "https://example.com/reservation.jpg"
              },
              checkIn: "2024-01-01",
              checkOut: "2024-01-07",
              pax: 4,
              property: "1"
            },
            latitude: 21.1619,
            longitude: -86.8515
          },
          reviewDate: "2024-01-01",
          rating: 5,
          comment: "Excelente propiedad"
        }
      ],
      reservationDetail: {
        userId: "user1",
        id: "res1",
        reservation: {
          id: "res1",
          property: "1",
          location: "Cancún",
          checkIn: "2024-01-01",
          checkOut: "2024-01-07",
          guests: 4,
          state: "confirmed",
          imageUrl: "https://example.com/reservation.jpg"
        },
        checkIn: "2024-01-01",
        checkOut: "2024-01-07",
        pax: 4,
        property: "1"
      },
      latitude: 21.1619,
      longitude: -86.8515
    }
  ];
  

  useEffect(() => {
    // Simulamos que obtenemos las propiedades desde un API
          setProperties(propertiesData);
  }, []);

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Propiedades</h2>

      {selectedProperty ? (
        <div className="property-detail">
          <button
            onClick={handleBackToList}
            className="flex items-center text-black-500 hover:text-gray-700 mb-4"
          >
            <FiArrowLeftCircle className="h-5 w-5 mr-2" />
            Volver a la lista de propiedades
          </button>
          <h3 className="text-xl font-semibold">{selectedProperty.title}</h3>
          <p className="text-gray-600">{selectedProperty.city}</p>
          <p className="text-gray-600">{selectedProperty.owner.firstname} {selectedProperty.owner.lastname}</p>
          <p className="font-medium">
            Precio por noche:{" "}
            <span className="text-green-500">${selectedProperty?.price?.[0]}</span>
          </p>
          <p className="text-sm text-gray-500">
            Capacidad: {selectedProperty.capacity} personas, {selectedProperty?.bedrooms?.[0]}{" "}
            habitaciones, {selectedProperty.bathrooms} baño(s)
          </p>
          <p className="text-sm text-gray-500">{selectedProperty.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {selectedProperty.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Propiedad ${selectedProperty.title} Foto ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {properties.map((property) => (
            <li
              key={property.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
              onClick={() => handlePropertyClick(property)}
            >
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.city}</p>
              <p className="font-medium">
                Precio por noche:{" "}
                <span className="text-green-500">${property?.price?.[0]}</span>
              </p>
              <p className="text-sm text-gray-500">
                Capacidad: {property.capacity} personas, {property?.bedrooms?.[0]}{" "}
                habitaciones, {property.bathrooms} baño(s)
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProperties;
