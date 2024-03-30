export interface Gifts {
    id : number
    gift : string
    quantity : number
    image : string
    destinatario : string
    price : number
 }


export interface FormProps {
    gifts: Gifts[];
    setGifts: any;
    onClose : () => void;
  }