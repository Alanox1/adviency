export interface Gifts {
    id : number
    gift : string
    quantity : number
    image : string
 }


export interface FormProps {
    gifts: Gifts[];
    setGifts: any;
    onClose : () => void;
  }