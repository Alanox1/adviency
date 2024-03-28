import {Gifts} from "./types"
const initialState = [
    {
        id : 1,
        gift : "Vitel tone",
        destinatario : "Alan",
        image : "",
        quantity : 2
    },
    {
        id : 2,
        gift : "Auriculares",
        destinatario : "Goncy",
        image : "",
        quantity : 5
    }
]


export const api = {
    gifts: () => new Promise((resolve, reject) => {
        try {
            const list = localStorage.getItem('gifts')
            setTimeout(
                () => resolve({
                    status: 'ok',
                    data: list ? JSON.parse(list) : initialState
                }),
                1000
            )
        } catch (error) {
            reject({
                status: 'error',
                data: []
            })
        }
    }),
    save: (data : Gifts[]) => new Promise((resolve, reject) => {
        try {
            localStorage.setItem('gifts', JSON.stringify(data))
            resolve('guardado')
        } catch (error) {
            reject('error al guardar')
        }
    })
}