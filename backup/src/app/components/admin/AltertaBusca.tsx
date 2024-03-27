type AlertaBuscaProps = {
  status: number,
  descricao: string
}

export default function AlertaBusca(props: AlertaBuscaProps) {
  return (
    <div className="flex items-center justify-center my-9 p-2">
      {props.status === 404 && (
        <div role="alert" className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{props.descricao}. Faça seu primeiro cadastro!</span>
        </div>
      )}

      {props.status === 500 && (
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Ocorreu um erro! Falar com leonardo.ncintra@outlook.com.</span>
        </div>
      )}

      {props.status === 0 && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </div>
  )
}