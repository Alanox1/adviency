import { useState } from "react";
import Parpadeantes from "./components/parpadeantes/Parpadeantes";

const initialState = [
  {
    id : 1,
    gift : "Vitel tone"
  },
  {
    id : 2,
    gift : "Auriculares"
  },
  {
    id : 3,
    gift : "Caramelos"
  }
]
export default function App() {

  const [ gifts, setGifts ] = useState( initialState )
  const [ value, setValue ] = useState( "" )

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        const newGift = {
          id : gifts.length + 1,
          gift : value
        }

        setGifts([...gifts, newGift])
        setValue("")

  }


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
                <input className="border-2 p-1 font-semibold focus:outline-none border-gray-900" type="text" value={ value } onChange={(e) => setValue(e.target.value)} />
                <button type="submit" className="bg-red-500 px-3 text-white ">Agregar</button>
              </form>
              <ul>
                  {gifts.map(gift=> <li key={gift.id} className="font-bold flex justify-between ">
                                        {gift.gift}
                                        <button onClick={() => handleDelete(gift.id)} className="bg-red-500 text-white px-2 py-0 my-1">x</button>
                                    </li>
                  )}  
              </ul>  

          </div>
         
    </div>
   
  );
}
