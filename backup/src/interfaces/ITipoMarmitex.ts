import { ITipoItemConsumivel } from "./ITipoItemConsumivel";

export interface IConfiguracaoMarmitex {
  tipo: ITipoItemConsumivel;
  quantidade: number;
}

export interface ITipoMarmitex {
  id: string,
  organizacaoId: string;
  descricao: string,
  ativo: boolean,
  preco: number,
  configuracoes: IConfiguracaoMarmitex[]
}
