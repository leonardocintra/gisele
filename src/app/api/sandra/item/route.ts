import { SANDRA_BASE_URL } from "@/lib/utils";
import { NextRequest } from "next/server";
import { IItem } from "restaurante";

const url = `${SANDRA_BASE_URL}`;

export async function GET(req: NextRequest) {
  const res = await fetch(`${url}/item`, {
    next: { revalidate: 10 },
  });

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
  return Response.json({ data });
}

export async function POST(req: Request) {
  const data = await req.json();

  const item: IItem = {
    tipo: "carne",
    items: data.items
  };

  const res = await fetch(`${url}/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

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

  if (res.status === 201) {
    return Response.json(res, {
      status: 201,
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
