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

  const response = await res.json();

  if (res.status === 201 || res.status === 200) {
    return Response.json(response, {
      status: res.status,
    });
  } else {
    return Response.json(
      {
        message: response
      },
      {
        status: res.status,
      }
    );
  }
}
