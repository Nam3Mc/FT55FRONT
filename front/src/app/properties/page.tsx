//"use client";
import { SearchParams } from "@/api/propertyFilter";
import Loading from "@/components/loading/loading";
import PropertyContainer from "@/views/propertyContainer";
import React, { Suspense } from "react";
//import Loading from '@/components/Loading';
//import { useInfiniteQuery } from "@tanstack/react-query";
//import MenuProperties from "@/components/menuProperties";

// const params = z.object({
//   type: z.enum(["casa", "departamento"]).optional(),
// });

export default async function PropertiesList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchparams = await searchParams;
  console.log("searchparams esperados:", resolvedSearchparams);
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
      <Suspense fallback={<Loading />}>
        <PropertyContainer searchParams={resolvedSearchparams} />
      </Suspense>
    </div>
  );
}
