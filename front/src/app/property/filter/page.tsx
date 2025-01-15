import { IFilters } from "@/api/FilterAPI";
import Loading from "@/components/loading/loading";
import PropertyContainer from "@/views/propertyContainer";
import React, { Suspense } from "react";

export default async function FilteredPropertiesPage({
  searchParams,
}: {
  searchParams: IFilters;
}) {
  const resolvedSearchparams = await searchParams;
  //console.log("searchparams esperados:", resolvedSearchparams);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PropertyContainer searchParams={resolvedSearchparams} />
      </Suspense>
    </div>
  );
}
