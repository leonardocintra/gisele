import { SANDRA_BASE_URL } from "@/lib/utils";

const url = `${SANDRA_BASE_URL}`;

export async function POST(req: Request) {
  const data = await req.json();

  const restaurante = {
    descricao: data.descricao,
    userId: data.userId
  };

  const urlRestaurante = `${url}/restaurante`;

  const res = await fetch(urlRestaurante, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurante),
  });

  if (res.status === 404) {
    return Response.json(
      {
        message: "Restaurante não foi cadastrado / atualizado",
      },
      {
        status: 404,
      }
    );
  } else if (res.status === 201 || res.status === 200) {
    return Response.json(res, {
      status: res.status,
    });
  } else {
    return Response.json(
      {
        message: res.json(),
      },
      {
        status: res.status,
      }
    );
  }
}
