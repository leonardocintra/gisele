"use client";

type ItemCardapioProps = {
  descricao: string;
  checked: boolean;
  onChange: any;
};

export default function ItemCardapio(props: ItemCardapioProps) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">{props.descricao}</span>
        <input type="checkbox" className="checkbox checkbox-secondary" />
      </label>
    </div>
  );
}
