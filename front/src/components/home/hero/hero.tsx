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
import React from "react";

export default function HeroHome() {
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
              className="absolute inset-0 bg-blue-900 bg-opacity-65"
              aria-hidden="true"
            ></div>
          </div>
        </div>
        <div className="container relative mx-auto px-4 pb-24 pt-10">
          <Image
            className="mx-auto"
            src="/logoBaner.png"
            alt="logoBaner"
            width={600}
            height={800}
          ></Image>
          <h2 className="text-4xl text-white font-bold mb-4 text-center">
            ¡Encuentra el alojamiento que estás buscando para una estadía
            soñada!
          </h2>
          <p className="text-xl text-white mb-8 text-center">
            Miles de propiedades te esperan
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
              <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <span className="text-gray-500 text-sm">Fecha de llegada</span>
                <Input type="date" className="w-full" />
              </label>
              <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <span className="text-gray-500 text-sm">Fecha de salida</span>
                <Input type="date" className="w-full" />
              </label>
              <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <span className="text-gray-500 text-sm">Huéspedes</span>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="uno">1</SelectItem>
                      <SelectItem value="dos">2</SelectItem>
                      <SelectItem value="tres">3</SelectItem>
                      <SelectItem value="cuatro">4</SelectItem>
                      <SelectItem value="cinco">5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </label>
              <label className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
                <span className="text-gray-500 text-sm">Ubicación</span>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Colombia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="peru">Perú</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
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
          </div>
        </div>
      </section>
    </div>
  );
}
