"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useState } from "react";
import { productsToPreLoad } from "@/helpers/data";
import { IProduct } from "@/interfaces/IProduct";
import { Heart } from "lucide-react";
import Link from "next/link";
import { IProperty } from "@/interfaces/IProperty";

export default function HeroHome() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [location, setLocation] = useState("Colombia");
  const [searchResults, setSearchResults] = useState<IProperty[]>([]);

  const handleSearch = () => {
    const results = productsToPreLoad.filter((product) => {
      const isLocationMatch =
        product.state.toLowerCase().includes(location.toLowerCase()) ||
        product.city.toLowerCase().includes(location.toLowerCase());

      // const isDateMatch =
      //   (!checkIn || product.checkin >= checkIn) &&
      //   (!checkOut || product.checkout <= checkOut);

      // const isCapacityMatch = product.capacity >= parseInt(guests);

      // return isLocationMatch && isDateMatch && isCapacityMatch;
    });
    // setSearchResults(results);
    // console.log("Search results:", results);
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute h-[700px] w-full">
            <Image
              src="/banner.jpeg"
              alt="Background"
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-blue-800 bg-opacity-65"
              aria-hidden="true"
            ></div>
          </div>
        </div>
        <div className="container relative mx-auto px-4 pb-24 pt-10">
          <Image
            className="mx-auto mb-6 mt-8"
            src="/logoBaner.png"
            alt="logoBaner"
            width={600}
            height={800}
          ></Image>
          <h2 className="text-4xl text-white font-bold mb-12 text-center">
            ¡Encuentra el alojamiento que estás buscando para una estadía
            soñada!
          </h2>
          <p className="text-xl text-white mb-16 text-center">
            Miles de propiedades te esperan
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">
                    Fecha de llegada
                  </span>
                  <Input
                    type="date"
                    className="w-full"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </label>
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">Fecha de salida</span>
                  <Input
                    type="date"
                    className="w-full"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </label>
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">Huéspedes</span>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </label>
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">Ubicación</span>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Colombia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Playa del Carmen">
                          Playa del Carmen
                        </SelectItem>
                        <SelectItem value="Bogotá">Bogotá</SelectItem>
                        <SelectItem value="Uspallata">Uspallata</SelectItem>
                        <SelectItem value="Valparaíso">Valparaíso</SelectItem>
                        <SelectItem value="Punta Cana">Punta Cana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </label>
                <div className="w-full md:w-1/5 px-3">
                  <Button type="submit" className="w-full h-10">
                    Buscar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* {searchResults.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold mb-4">Resultados de la Busqueda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-md">
                <Link href={`/house/${product.id}`}>
                  <div className="relative">
                    <Image
                      src={product.photos?.[0] ?? "/casadef.png"}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="w-full h-60 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart />
                    </Button>
                  </div>
                  <div className="flex h-[350px] flex-col justify-between rounded-b-lg bg-white p-4">
                    <h3 className="text-xl font-semibold mt-2">
                      {product.name}
                    </h3>
                    <p className="mt-2 mb-2 text-lg font-bold">
                      {product.city}, {product.state}
                    </p>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <span className="text-sm font-bold">Habitaciones</span>
                      <p className="text-sm font-bold mb-2">
                        {product.bedrooms}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <span className="text-sm font-bold">Huéspedes</span>
                      <p className="text-sm font-bold mb-2">
                        {product.capacity}
                      </p>
                    </div>
                    <span className="text-xl text-[#239b56] font-bold">
                      ${product.price} Por noche
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
