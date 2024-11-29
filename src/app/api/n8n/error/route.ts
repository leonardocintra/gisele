export async function POST(req: Request) {
  const data = await req.json();

  const errorMessage = {
    descricao: data.descricao,
    userId: data.userId
  };

  const urlN8n = `https://restaurante-n8n.ypg4r9.easypanel.host/webhook/e5c29c27-75dd-4c7b-8592-dee4fbaaa7a1`;

  const res = await fetch(urlN8n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(errorMessage),
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
  }

  if (res.status === 201 || res.status === 200) {
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