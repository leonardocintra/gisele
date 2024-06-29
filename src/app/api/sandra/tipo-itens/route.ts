import { IItemTipo } from "@/interfaces/IItemTIpo";
import { RESTAURANTE_TEMPEIRO_E_AMOR_ID, SANDRA_BASE_URL } from "@/lib/utils";

const url = `${SANDRA_BASE_URL}/tipo-item`;

export async function GET() {
  const res = await fetch(
    `${url}/restaurante/${RESTAURANTE_TEMPEIRO_E_AMOR_ID}`
  );

  const data = await res.json();

  return Response.json({ data });
}

export async function POST(req: Request) {
  const data = await req.json();

  const tipo: Partial<IItemTipo> = {
    descricao: data.descricao,
    restauranteId: RESTAURANTE_TEMPEIRO_E_AMOR_ID,
  };

  const res = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipo),
  });

  if (res.status === 201) {
    return Response.json(
      {
        message: "Cadastrado com sucesso",
      },
      {
        status: 201,
      }
    );
  } else if (res.status === 400) {
    const resData = await res.json();
    return Response.json(
      {
        message: resData.message,
      },
      {
        status: res.status,
      }
    );
  } else {
    return Response.json(res.json());
  }
}
