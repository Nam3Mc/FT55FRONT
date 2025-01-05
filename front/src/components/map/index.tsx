"use client";
// react
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const GoogleMaps: React.FC = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");

      const locationInMap = {
        lat: 4.623651,
        lng: -74.0941912,
      };
      //Marker
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const options: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 15,
        mapId: "NEXT_MAPS_TUTS",
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);

      //add the marker in the map
      const marker = new AdvancedMarkerElement({
        map: map,
        position: locationInMap,
      });
    };
    initializeMap();
  }, []);
  return (
    <div className="mb-4 lg:mx-40">
      <h3 className="text-xl font-semibold mb-2">¿Dónde vas a estar?</h3>
      <div className=" h-96 w-full rounded-lg" ref={mapRef}>
        Mapa aqui
      </div>
    </div>
  );
};

export default Map;
