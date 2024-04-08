import { fetchDataStrapi, strapiBaseUrl } from "@/data/strapi/loaders";
import qs from "qs";

export async function getCardapios() {
  const url = new URL("/api/cardapios", strapiBaseUrl);

  url.search = qs.stringify({
    populate: {
      items: {
        fields: ["id", "descricao", "item_tipo"],
        populate: {
          item_tipo: {
            fields: ["id", "descricao"],
          },
        },
      },
    },
  });

  return await fetchDataStrapi(url.href);
}
