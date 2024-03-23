import { useState, useEffect } from "react";
import Parpadeantes from "./components/parpadeantes/Parpadeantes";
import Form from "./components/form/Form";
import {Gifts} from "./types"

const initialState = [
  {
    id : 1,
    gift : "Vitel tone",
    quantity : 1,
    image : ""
  },
  {
    id : 2,
    gift : "Auriculares",
    quantity : 1,
    image : ""
  },
  {
    id : 3,
    gift : "Caramelos",
    quantity : 2,
    image : ""
  }
]
export default function App () {

  const [gifts, setGifts] = useState<Gifts[]>(() => {
    const storedList = localStorage.getItem("gifts");
    return storedList ? JSON.parse(storedList) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(gifts));
  }, [ gifts ]);



  const handleDelete = ( id : number ) => {
    const newGifts = gifts.filter(gift => gift.id !== id)

    setGifts(newGifts)
}



  return (
    <div className="flex flex-col h-screen items-center justify-center w-full  ">
          
          <div className="px-12 py-8 h-auto bg-white rounded-xl shadow-2xl">
            <div className="flex justify-between mb-4">
                <Parpadeantes bgColor={"bg-yellow-500"} />
                <Parpadeantes bgColor={"bg-green-500"} />
                <Parpadeantes bgColor={"bg-red-500"} />
                <Parpadeantes bgColor={"bg-green-500"} />
                <Parpadeantes bgColor={"bg-yellow-500"} />    
            </div>
            
              <h1 className="text-5xl font-bold underline mb-4">Regalos:</h1>

              <Form gifts={gifts} setGifts={setGifts} />

            <div>

            
              {gifts.length === 0 ? (
                                     <p className="text-center font-bold my-4">¡No hay regalos! ¡Agregá algo!</p>
                                    ) : (
                                    <ul className="p-0">
                                      {gifts.map(({ id, gift, quantity, image }) => (
                                        <li key={id} className="font-bold flex justify-between items-center my-4 ">
                                          
                                          <div className="flex gap-3">
                                            <img src={image === "" ? "https://images.pexels.com/photos/220617/pexels-photo-220617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : image} className="w-12 h-auto object-cover" />
                                            <p>{gift}</p>
                                            <p className="text-start">{quantity === undefined || quantity === 1 ? "" : `x ${quantity}`}</p>
                                          </div>
                                       
                                          <button
                                            onClick={() => handleDelete(id)}
                                            className="bg-red-500 text-white px-2 py-0 my-1"
                                          >
                                            x
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                )}
               </div>
              <button onClick={() => setGifts([])} className="w-full bg-red-500 mt-4 py-1 text-white">Borrar todo</button>
          </div>
         
    </div>
   
  );
}
