interface IItemConfiguracoes {
  id: number;
  descricao: string;
}

interface IConfiguracoes {
  id: number;
  quantidade: number;
  item_tipo: IItemConfiguracoes;
}

interface IConfiguracoesData {
  data: IConfiguracoes[];
}

export interface IMarmitex {
  id: number;
  descricao: string;
  ativo: boolean;
  preco: number;
  configuracoes: IConfiguracoesData;
}
