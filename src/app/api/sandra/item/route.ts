import { SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${SANDRA_BASE_URL}`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await fetch(`${url}/item/${params.id}`);

  if (res.status === 404) {
    return Response.json(
      {
        message: "Item não encontrado",
      },
      {
        status: 404,
      }
    );
  }

  const data = await res.json();
  return Response.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { tipoItemId: number, descricao: string } }
) {
  const res = await fetch(`${url}/item/${params.tipoItemId}`);

  if (res.status === 404) {
    return Response.json(
      {
        message: "Item não encontrado",
      },
      {
        status: 404,
      }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
