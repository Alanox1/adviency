import { useState } from "react";

export default function App() {

  const [ gifts, setGifts ] = useState( ["Vitel tone", "Auriculares", "Caramelos"] )

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full ">

          <div className="p-12 h-auto bg-white rounded-xl shadow-2xl">
              <h1 className="text-5xl font-bold underline mb-4">Regalos:</h1>

              <ul>
                  {gifts.map(gift => <li className="font-bold">{gift}</li>)}  
              </ul>  

          </div>
         
    </div>
   
  );
}
