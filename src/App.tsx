import { useState, useEffect } from "react";
import Modal from "react-modal";
import Parpadeantes from "./components/parpadeantes/Parpadeantes";
import Form from "./components/form/Form";
import { Gifts } from "./types";
import imageDefault from "../public/imageDefault.webp";
import { api } from "../src/api"
import { useGlobalAudioPlayer } from 'react-use-audio-player';
Modal.setAppElement("#root");

export default function App() {
  const [ gifts, setGifts ] = useState<Gifts[]>([])


  const [visible, setVisible] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gifts | null>(null);
  const [ isLoading, setIsLoading ] = useState( true )
  
  const [ previsualizar, setPrevisualizar ] = useState(false)
  const [ isPlaying, setIsPlaying ] = useState( false )

  const { load } = useGlobalAudioPlayer();
  useEffect(() => {
    api.gifts()
      .then((gifts: any) => setGifts(gifts.data))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    api.save(gifts)
    .then(console.log).catch(console.log)
    .catch(console.log)
  }, [gifts]);
  

  const handleDelete = (id: number) => {
    const newGifts = gifts.filter((gift) => gift.id !== id);
    setGifts(newGifts);
  };

  const openEditModal = (gift: Gifts) => {
    setSelectedGift(gift);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setPrevisualizar(false)
    setSelectedGift(null);
  };
  
  const total = gifts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0); 


  const imprimir = () => {
    window.print()
  }


  const play = () => {
    load("https://adviency-jet.vercel.app/public/Jingle-Bells.mp3", { autoplay: true, loop : true });
    setIsPlaying(true)
  }

  const stop = () => {
    load("https://adviency-jet.vercel.app/public/Jingle-Bells.mp3", { autoplay: false });
    setIsPlaying(false)
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center w-full ">

      {isLoading
       ? <p className="px-20 py-16 h-auto bg-white rounded-xl shadow-2xl">Cargando...</p>
       :   <div className="px-12 py-8 h-auto bg-white rounded-xl shadow-2xl">
       <div className="flex justify-between mb-4">
         <Parpadeantes bgColor={"bg-yellow-500"} />
         <Parpadeantes bgColor={"bg-green-500"} />
         <Parpadeantes bgColor={"bg-red-500"} />
         <Parpadeantes bgColor={"bg-green-500"} />
         <Parpadeantes bgColor={"bg-yellow-500"} />
       </div>

       <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold underline mb-4">Regalos:</h1>
          <button onClick={isPlaying ? () => stop() : () => play() } className="text-3xl">{ isPlaying ? "🔇" : "🔊" }</button>
       </div>

   
       
       <button
         onClick={() => {
           setVisible(true);
           setSelectedGift(null); 
         }}
         className="w-full bg-red-500 text-white p-1"
       >
         Agregar
       </button>
       <div>
       
         {gifts.length === 0 ? (
           <p className="text-center font-bold my-4">
             ¡No hay regalos! ¡Agregá algo!
           </p>
         ) : (
           <ul className="p-0">
             {gifts.map(({ id, gift, quantity, image, destinatario, price }) => (
               <li
                 key={id}
                 className="font-bold flex justify-between items-center my-4 gap-16"
               >
                 <div className="flex gap-3">
                   <img
                     src={image === "" ? imageDefault : image}
                     className="w-12 h-auto object-cover"
                   />
                   <div className="flex flex-col">
                     <h2>{gift}</h2>
                     <p className="text-sm text-gray-700">{destinatario}</p>
                   </div>

                   <p className="text-start">
                     {quantity === undefined || quantity === 1
                       ? ""
                       : `x ${quantity}`}
                   </p>
                   <p>{price === 0 ? "" : `- $ ${price * quantity}`}</p>
                 </div>
                 <div className="flex gap-2">
                   <button
                     className="bg-red-500 text-white px-2 py-0 my-1"
                     onClick={() => openEditModal({ id, gift, quantity, image, destinatario, price })}
                   >
                     E
                   </button>
                   <button
                     onClick={() => handleDelete(id)}
                     className="bg-red-500 text-white px-2 py-0 my-1"
                   >
                     x
                   </button>
                 </div>
               </li>
             ))}
           </ul>
         )}
        
       </div>

       <h4 className="text-center font-semibold">Total: ${total}</h4>
       <button
         onClick={() => setGifts([])}
         className="w-full bg-red-500 mt-4 py-1 text-white"
       >
         Borrar todo
       </button>
       <button onClick={() => {
                      setPrevisualizar(true)
                      setVisible(true)
       } } className="w-full bg-gray-500 mt-4 py-1 text-white">Previsualizar</button>
     </div>
      }
     

      {visible ? (
        <Modal
          isOpen={visible}
          onRequestClose={closeModal}
          contentLabel="Formulario Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '80vw',
              maxHeight: '80vh',
              overflow: 'auto'
            }
          }}
        >
          {previsualizar
              ? <div className="flex flex-col justify-between items-center p-0 m-0">
                <h2 className="text-5xl font-bold underline mb-4">Comprar: </h2>
                <ul className="flex flex-col gap-4">
                  {gifts.map(({gift, destinatario, image, quantity,id}) => {
                  return <article key={id} className="flex gap-4 font-bold">
                            <img src={image === "" ? imageDefault : image} className="w-12 h-auto object-cover" />
                             
                            <div className="flex flex-col">
                              <h2 className="text-xl">{gift}</h2>
                              <p>{destinatario}</p>
                            </div>
                            <p className="text-xl">{`(${quantity})`}</p>
                         </article>
                  })}
                </ul>
                <div className="flex gap-4">
                    
                    <button onClick={() => {
                              setVisible(false)
                              setPrevisualizar(false)
                    }}
                            className="w-full bg-red-500 my-10 p-2 text-white print:hidden"
                    >
                      Cerrar
                    </button>

                    <button onClick={imprimir }  className="w-full bg-gray-500 my-10 p-2 text-white print:hidden">Imprimir</button>

                </div>
               
              </div> 
      : <Form
          gifts={gifts}
          setGifts={setGifts}
          onClose={closeModal}
          additionalGift={selectedGift !== null ? selectedGift : undefined}
        />
      }
        </Modal>
      ) : (
        ""
      )}

     
    </div>
  );
}

