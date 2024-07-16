import { RESTAURANTE_TEMPEIRO_E_AMOR_ID, SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${SANDRA_BASE_URL}/marmitex/tipo-marmitex`;

export async function GET(req: NextRequest) {
  
  const res = await fetch(
    `${url}/restaurante/${RESTAURANTE_TEMPEIRO_E_AMOR_ID}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (res.status === 404) {
    return Response.json(
      {
        message: "Tipo marmitex não encontrado",
      },
      {
        status: 404,
      }
    );
  }

  const data = await res.json();
  return Response.json({ data });
}
