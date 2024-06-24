import { RESTAURANTE_TEMPEIRO_E_AMOR_ID, SANDRA_BASE_URL } from "@/lib/utils";

const url = `${SANDRA_BASE_URL}/tipo-item/restaurante/${RESTAURANTE_TEMPEIRO_E_AMOR_ID}`;

export async function GET() {
  const res = await fetch(url);

  const data = await res.json();
  
  return Response.json({ data });
}
