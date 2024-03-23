import React, { useState } from 'react'
import {Gifts, FormProps} from "../../types"



const Form: React.FC<FormProps> = ( { gifts , setGifts}) => {

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
  }


  if(quantity === undefined) return 


  return (
    
    <form onSubmit={handleSubmit} className="flex justify-between gap-2  mb-2">
    <input 
           className="border-2 p-1 font-semibold focus:outline-none border-gray-900 flex-grow w-3/4" 
           type="text" 
           value={ value } 
           onChange={(e) => setValue(e.target.value)} 
    />

    <input
        type="text"
        placeholder="http://image...."
        className='border-2 p-1 border-gray-900' 
        value={image}
        onChange={(e) => setImage(e.target.value)}
     />


    <input min="1" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-10" />
    <button type="submit" className="bg-red-500 px-3 text-white ">Agregar</button>
  </form>
  )
}

export default Form