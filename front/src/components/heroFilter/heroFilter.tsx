"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function HeroFilter() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    // checkIn: " ",
    // checkOut: " ",
    capacity: "",
    country: "",
    type: "",
  });

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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">Fecha de llegada</span>
            <Input
              type="date"
              className="w-full"
              name="checkIn"
              // value={searchParams.checkIn}
              // onChange={handleInputChange}
            />
          </label>
          <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">Fecha de salida</span>
            <Input
              type="date"
              className="w-full"
              name="checkOut"
              // value={searchParams.checkOut}
              // onChange={handleInputChange}
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
                <SelectValue placeholder="Propiedad?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="casa">Casas</SelectItem>
                  <SelectItem value="apartamento">Apartamentos</SelectItem>
                  <SelectItem value="habitacion">Habitaciones</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
          <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">Huéspedes</span>
            <Input
              placeholder="Cuántos?"
              type="number"
              className="w-full"
              min={0}
              name="capacity"
              value={searchParams.capacity}
              onChange={handleInputChange}
            />
          </label>
          <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">País</span>
            <Input
              placeholder="Dónde?"
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
  );
}
