// import "../../index.css"

interface Color {
    bgColor : string
}

const Parpadeantes = ({ bgColor } : Color) => <div className={`h-6 w-6 rounded-full m-0 p-0 parpadeante ${bgColor}`}></div>
export default Parpadeantes