import { IFilters } from "@/api/FilterAPI";
import Loading from "@/components/loading/loading";
import PropertyContainer from "@/views/propertyContainer";
import React, { Suspense } from "react";

// Define PageProps according to the error message's hint
interface PageProps {
  searchParams: Promise<IFilters>;
}

export default async function FilteredPropertiesPage({
  searchParams,
}: PageProps) {
  // Await the searchParams Promise to resolve
  const resolvedSearchParams = await searchParams;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PropertyContainer searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}