import { useState, useEffect } from "react";
import Parpadeantes from "./components/parpadeantes/Parpadeantes";


interface Gifts {
   id : number
   gift : string
   quantity : number
}
const initialState = [
  {
    id : 1,
    gift : "Vitel tone",
    quantity : 1
  },
  {
    id : 2,
    gift : "Auriculares",
    quantity : 1
  },
  {
    id : 3,
    gift : "Caramelos",
    quantity : 2
  }
]
export default function App () {

  const [gifts, setGifts] = useState<Gifts[]>(() => {
    const storedList = localStorage.getItem("gifts");
    return storedList ? JSON.parse(storedList) : initialState;
  });
  
  const [ value, setValue ] = useState( "" )
  const [ quantity, setQuantity ] = useState( 1 )


  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(gifts));
  }, [ gifts ]);


  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        if (value.length === 0 || gifts.find(({ gift }) => gift === value) !== undefined) return;


        const newGift = {
          id : gifts.length + 1,
          gift : value,
          quantity : quantity
        }
        
         setGifts(prevGifts => [...prevGifts, newGift])
      
        setValue("")
        setQuantity(1)

  }
  
  if(quantity === undefined) return 


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
              <form onSubmit={handleSubmit} className="flex justify-between gap-2  mb-2">
                <input className="border-2 p-1 font-semibold focus:outline-none border-gray-900 flex-grow w-3/4" type="text" value={ value } onChange={(e) => setValue(e.target.value)} />
                <input min="1" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-10" />
                <button type="submit" className="bg-red-500 px-3 text-white ">Agregar</button>
              </form>
              {gifts.length === 0 ? (
                                     <p className="text-center font-bold my-4">¡No hay regalos! ¡Agregá algo!</p>
                                    ) : (
                                    <ul className="p-0">
                                      {gifts.map(({ id, gift, quantity }) => (
                                        <li key={id} className="font-bold flex justify-between items-center ">
                                          <div className="flex gap-3">
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
               
              <button onClick={() => setGifts([])} className="w-full bg-red-500 mt-4 py-1 text-white">Borrar todo</button>
          </div>
         
    </div>
   
  );
}
