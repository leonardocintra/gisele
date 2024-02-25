import { ITipoItemConsumivel } from "./ITipoItemConsumivel";

export interface IItemConsumivel {
  id: string,
  descricao: string;
  preco: number;
  tipo: ITipoItemConsumivel;
}

// Nome da comida Ex: arroz, feijao, cerveja skol, suco laranja
