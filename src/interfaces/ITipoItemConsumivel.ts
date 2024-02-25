export interface ITipoItemConsumivel {
  id: string,
  descricao: string;
  exibirPreco: boolean;
  imagem: string;
}

/**
 * Tipo item: carne, salada, guarnicao, bebida, etc
 * exibirPreco: o arroz, feijao nao tem preco dele mesmo, mas a lata de coca, suco, cerveja tem
 */
