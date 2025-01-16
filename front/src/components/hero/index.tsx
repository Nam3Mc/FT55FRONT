"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function HeroHome() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    checkIn: " ",
    checkOut: " ",
    capacity: "",
    country: "",
    type: "",
  });
  // Fecha mínima para `checkIn` (hoy)
  const today = new Date().toISOString().split("T")[0];

  // Validar fecha de checkOut
  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value && searchParams.checkIn) {
      const checkInDate = new Date(searchParams.checkIn);
      const checkOutDate = new Date(value);
      if (checkOutDate <= checkInDate) {
        // Si checkOut es igual o menor a checkIn, no lo actualizamos
        return;
      }
    }
    setSearchParams((prev) => ({ ...prev, checkOut: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).filter(
          ([_, value]) => value !== undefined && value.trim() !== ""
        )
      )
    ).toString();
    router.push(`/property/filter?${queryString}`);
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mb-12">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">
                    Fecha de llegada
                  </span>
                  <Input
                    type="date"
                    className="w-full"
                    name="checkIn"
                    value={searchParams.checkIn}
                    min={today}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">Fecha de salida</span>
                  <Input
                    type="date"
                    className="w-full"
                    name="checkOut"
                    value={searchParams.checkOut}
                    min={searchParams.checkIn ? searchParams.checkIn : today}
                    onChange={handleCheckOutChange}
                  />
                </label>
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">Tipo</span>
                  <Select
                    value={searchParams.type}
                    onValueChange={(value) =>
                      setSearchParams((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="¿Qué buscas?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="casa">Casas</SelectItem>
                        <SelectItem value="apartamento">
                          Apartamentos
                        </SelectItem>
                        <SelectItem value="habitacion">Habitaciones</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </label>
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">Huéspedes</span>
                  <Input
                    placeholder="¿Cuántos?"
                    type="number"
                    className="w-full"
                    min={1}
                    name="capacity"
                    value={searchParams.capacity}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">País</span>
                  <Input
                    placeholder="¿Dónde?"
                    type="text"
                    className="w-full"
                    name="country"
                    value={searchParams.country}
                    onChange={handleInputChange}
                  />
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
    </div>
  );
}
