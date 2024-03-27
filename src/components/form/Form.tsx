
import React, { useState } from "react";
import { Gifts, FormProps } from "../../types";

const Form: React.FC<FormProps & { additionalGift?: Gifts }> = ({
  gifts,
  setGifts,
  onClose,
  additionalGift
}) => {
  const [value, setValue] = useState(additionalGift ? additionalGift.gift : "");
  const [quantity, setQuantity] = useState(additionalGift ? additionalGift.quantity : 1);
  const [image, setImage] = useState(additionalGift ? additionalGift.image : "");
  const [destinatario, setDestinatario] = useState(additionalGift ? additionalGift.destinatario : "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newGift = {
      id: additionalGift ? additionalGift.id : gifts.length + 1,
      gift: value,
      quantity,
      image,
      destinatario
    };

    if (additionalGift) {
      const updatedGifts = gifts.map(g =>
        g.id === additionalGift.id ? newGift : g
      );
      setGifts(updatedGifts);
    } else {
      setGifts((prevGifts: Gifts[]) => [...prevGifts, newGift]);
    }

    setValue("");
    setQuantity(1);
    setImage("");
    setDestinatario("");

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between gap-2 flex-col items-center mb-2 h-full py-6 px-4"
    >
      <input
        className="border-2 p-2 font-semibold focus:outline-none border-gray-900 w-full"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Medias..."
      />

      <input
        type="text"
        value={destinatario}
        onChange={(e) => setDestinatario(e.target.value)}
        className="border-2 p-2 border-gray-900 w-full"
        placeholder="Alan"
      />
      <input
        type="text"
        placeholder="http://image...."
        className="border-2 p-2 border-gray-900 w-full"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        min="1"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full py-2 border-2  border-gray-900"
      />

      <div className="flex justify-between w-full gap-2 pt-4">
        <button className="w-3/6 py-2 bg-gray-300" onClick={onClose}>
          Cerrar
        </button>

        <button type="submit" className="bg-red-500 px-3 py-2 text-white w-3/6">
          {additionalGift ? "Editar" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

export default Form;
