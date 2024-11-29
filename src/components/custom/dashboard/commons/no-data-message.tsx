type NoDataMessagePros = {
  description: string;
};

export default function NoDataMessage({ description }: NoDataMessagePros) {
  return (
    <div className="text-4xl text-center my-12 text-slate-700">
      <p>{description}</p>
    </div>
  );
}
