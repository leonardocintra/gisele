function getDataFormatada() {
  const diasDaSemana = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const dataAtual = new Date();
  const diaSemana = diasDaSemana[dataAtual.getDay()];
  const diaDoMes = dataAtual.getDate();
  const mes = meses[dataAtual.getMonth()];
  const ano = dataAtual.getFullYear();

  const resultado = `${diaSemana}, dia ${diaDoMes} de ${mes} de ${ano}`;
  return resultado;
}

export { getDataFormatada };
