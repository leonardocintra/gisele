import { fetchDataStrapi, strapiBaseUrl } from "@/data/strapi/loaders";
import qs from "qs";

export async function getMarmitex() {
  const url = new URL("/api/marmitexes", strapiBaseUrl);

  url.search = qs.stringify({
    populate: {
      configuracoes: {
        fields: ["id", "quantidade", "item_tipo"],
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
