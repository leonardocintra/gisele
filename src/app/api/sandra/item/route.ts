import { SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${SANDRA_BASE_URL}`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restauranteId = searchParams.get('restauranteId')

  const res = await fetch(`${url}/item/${restauranteId}`, {
    cache: "no-store"
  });
  const data = await res.json();

  if (res.status === 404) {
    return Response.json(
      {
        message: "Items não encontrado",
      },
      {
        status: 404,
      }
    );
  }

  return Response.json(data);
}
