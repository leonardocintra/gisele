import { SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";
import { ICardapio } from "restaurante";

const baseUrl = `${SANDRA_BASE_URL}`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restauranteId = searchParams.get('restauranteId')

  const res = await fetch(`${baseUrl}/cardapio/${restauranteId}`, {
    cache: "no-cache"
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

export async function POST(req: Request) {
  return _insertOrUpdateCardapio(req, false);
}

export async function PATCH(req: Request) {
  return _insertOrUpdateCardapio(req, true);
}

async function _insertOrUpdateCardapio(req: Request, isUpdate: boolean) {
  const { searchParams } = new URL(req.url);
  const restauranteId = searchParams.get('restauranteId')

  const data = await req.json();

  const cardapio: ICardapio = {
    restaurante: restauranteId as string,
    tipo: data.tipo,
    items: data.items,
  };

  let url = `${baseUrl}/cardapio`;
  let method = "POST";

  if (isUpdate) {
    url += `/${restauranteId}`;
    method = "PATCH";
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardapio),
  });

  if (res.status === 404) {
    return Response.json(
      {
        message: "Cardapio não foi cadastrado / atualizado",
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
