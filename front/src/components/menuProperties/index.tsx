import React from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const MenuProperties = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  const handleTypeChange = (type?: "casa" | "departamento") => {
    if (type === undefined) {
      router.push("/properties");
      return;
    }

    router.push(`/properties?type=${type}`);
  };
  return (
    <div className="rounded-lg bg-gradient-to-br from-white">
      <ul className="grid w-[100px] gap-3 p-4 sm:w-[150px] md:w-[200px] lg:w-[250px] grid-cols-1">
        <li>
          <button
            onClick={() => handleTypeChange(undefined)}
            className="block select-none space-y-1 rounded-md p-2 leading-none text-white no-underline outline-none transition-colors hover:bg-slate-500/10 focus:bg-slate/10"
          >
            <div className="text-sm font-medium capitalize leading-none">
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground hover:text-black">
                Propiedades
              </p>
            </div>
          </button>
          <button
            onClick={() => handleTypeChange("casa")}
            className="block select-none space-y-1 rounded-md p-2 leading-none text-white no-underline outline-none transition-colors hover:bg-slate-500/10 focus:bg-slate/10"
          >
            <div className="text-sm font-medium capitalize leading-none">
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground hover:text-black">
                Casas
              </p>
            </div>
          </button>
          <button
            onClick={() => handleTypeChange("departamento")}
            className="block select-none space-y-1 rounded-md p-2 leading-none text-white no-underline outline-none transition-colors hover:bg-slate-500/10 focus:bg-slate/10"
          >
            <div className="text-sm font-medium capitalize leading-none">
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground hover:text-black">
                Departamentos
              </p>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuProperties;
