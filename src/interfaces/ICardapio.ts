import { IItemConsumivel } from "./IItemConsumivel";

export interface ICardapio {
  id: string;
  data: Date;
  itens: IItemConsumivel[];
  restauranteId: string;
}
