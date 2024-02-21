import { ITipoItemConsumivel } from "./ITipoItemConsumivel";

export interface IConfiguracaoMarmitex {
  tipo: ITipoItemConsumivel;
  quantidade: number;
}

export interface ITipoMarmitex {
  descricao: string,
  ativo: boolean,
  configuracoes: IConfiguracaoMarmitex[]
}
