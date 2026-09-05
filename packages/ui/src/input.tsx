interface InputProps{
  // inputName : string,
  placeholder : string
  type : string
}

export const Input = ({ placeholder, type} : InputProps) => {
  return (
    <input className="bg-purple-100 rounded-[5px] px-4 py-2 text-black placeholder:text-gray-400  focus:outline-none focus:ring-2 border "  type={type} placeholder={placeholder}>
    </input>
  
  )
}
