import { IItemConsumivel } from "./IItemConsumivel";

export interface ICardapio {
  id: string;
  organizacaoId: string;
  data: Date;
  itens: IItemConsumivel[];
}
