import { IItem } from "./IItem";

export interface ICardapio {
  id: number;
  data_cardapio: Date;
  items: IItem;
}
