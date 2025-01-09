import { productsToPreLoad } from "@/helpers/data";
import { useSearchParams } from "next/navigation";
import { env } from "process";
import { z } from "zod";

const paramsSchema = z.object({
  type: z.enum(["casa", "departamento"]).optional(),
});
export function getProperties() {
  const searchParams = useSearchParams();
  const { type } = paramsSchema.parse({ type: searchParams.get("type") });
  //const types = productsToPreLoad.map((product) => product.type);
  const url = new URL("/properties", env.NEXT_PUBLIC_API_URL);

  if (type === "casa" || type === "departamento") {
    url.searchParams.append("type", type);
  }
}
