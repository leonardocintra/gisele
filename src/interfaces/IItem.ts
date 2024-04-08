export interface IItemData {
  data: IItem[];
}

interface IItem {
  id: number;
  descricao: string;
  item_tipo: IItemTipo;
}
