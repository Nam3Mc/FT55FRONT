//"use client";
import { getProperties } from "@/services/propertiesService";
import PropertyContainer from "@/views/propertyContainer";
import { useSearchParams } from "next/navigation";
import React from "react";
import { z } from "zod";
//import { useInfiniteQuery } from "@tanstack/react-query";
//import MenuProperties from "@/components/menuProperties";

const params = z.object({
  type: z.enum(["casa", "departamento"]).optional(),
});

export default function PropertiesList() {
  // const searchParams = useSearchParams();
  // const typeParam = searchParams.get("type") ?? undefined;
  // const { type } = params.parse({ type: typeParam });

  // const { data, status } = useInfiniteQuery({
  //   queryKey: ["properties", type],
  //   queryFn: () => getProperties(),
  //   initialPageParam: "",
  //   getNextPageParam: (lastPage) => lastPage.nextCursor,
  // });
  // getProperties();

  return (
    <div>
      <PropertyContainer />
    </div>
  );
}
