import { SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${SANDRA_BASE_URL}/marmitex`;

export async function GET(
  req: NextRequest,
  { params }: { params: { tipoItemId: number } }
) {
  return Response.json(true);
}
