import { SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${SANDRA_BASE_URL}/item`;

export async function GET(
  req: NextRequest,
  { params }: { params: { tipoItemId: number } }
) {
  const res = await fetch(`${url}/tipo-item/${params.tipoItemId}`);

  if (res.status === 404) {
    return Response.json(
      {
        message: "Tipo Item não encontrado",
      },
      {
        status: 404,
      }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
