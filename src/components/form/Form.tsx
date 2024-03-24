import React, { useState } from 'react'
import {Gifts, FormProps} from "../../types"



const Form: React.FC<FormProps> = ( { gifts , setGifts, onClose}) => {

    const [ value, setValue ] = useState( "" )
    const [ quantity, setQuantity ] = useState( 1 )
    const [ image, setImage ] = useState( "" )


    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        if (value.length === 0 || gifts.find(({ gift }) => gift === value) !== undefined) return;


        const newGift = {
          id : gifts.length + 1,
          gift : value,
          quantity : quantity,
          image : image
        }
        
        setGifts((prevGifts: Gifts[]) => [...prevGifts, newGift])
        setValue("")
        setQuantity(1)
        setImage("")


        onClose()
  }


  if(quantity === undefined) return 


  return (
    
    <form onSubmit={handleSubmit} className="flex justify-between gap-2 flex-col items-center mb-2 h-full py-6 px-4">
    <input 
           className="border-2 p-2 font-semibold focus:outline-none border-gray-900 w-full" 
           type="text" 
           value={ value } 
           onChange={(e) => setValue(e.target.value)} 
           placeholder='Medias...'
    />

    <input
        type="text"
        placeholder="http://image...."
        className='border-2 p-2 border-gray-900 w-full' 
        value={image}
        onChange={(e) => setImage(e.target.value)}
     />


    <input min="1" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full py-2 border-2  border-gray-900" />

    <div className='flex justify-between w-full gap-2'>
      <button className='w-3/6 py-2 bg-gray-300'  onClick={() => onClose()}>Cerrar</button>
      <button type="submit" className="bg-red-500 px-3 py-2 text-white w-3/6">Agregar</button>
    </div>
    
  </form>
  )
}

export default Form