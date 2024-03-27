type IdentificadorDaPaginaProps = {
  descricao: string;
};

export default function IdentificadorDaPagina(
  props: IdentificadorDaPaginaProps
) {
  return (
    <h1 className="text-2xl font-bold text-gray-500 text-center mt-8">
      {props.descricao}
    </h1>
  );
}
