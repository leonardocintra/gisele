import { IItemData } from "@/interfaces/IItem";

export interface ICardapio {
  id: number;
  data_cardapio: Date;
  items: IItemData;
}
