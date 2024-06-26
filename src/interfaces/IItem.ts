import { IItemTipo } from "./IItemTIpo";

export interface IItem {
  id: number;
  descricao: string;
  tipoItem: IItemTipo;
}
