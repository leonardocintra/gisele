import { SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${SANDRA_BASE_URL}`;

export async function GET(req: NextRequest) {
  const res = await fetch(`${url}/cardapio`, {
    next: { revalidate: 10 },
  });

  if (res.status === 404) {
    return Response.json(
      {
        message: "Cardapio não encontrado",
      },
      {
        status: 404,
      }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
