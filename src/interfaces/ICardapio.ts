import { IItemConsumivel } from "./IItemConsumivel";

export interface ICardapio {
  data: Date;
  itens: IItemConsumivel[];
}
