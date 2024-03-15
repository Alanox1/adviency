import { useState } from "react";
import Parpadeantes from "./components/parpadeantes/Parpadeantes";


export default function App() {

  const [ gifts, setGifts ] = useState( ["Vitel tone", "Auriculares", "Caramelos"] )

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

              <ul>
                  {gifts.map(gift => <li className="font-bold">{gift}</li>)}  
              </ul>  

          </div>
         
    </div>
   
  );
}
