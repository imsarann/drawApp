interface ButtonProps{
  buttonName : string
  onClick : () => any
}

export const Button = ({buttonName, onClick} : ButtonProps) =>{
  return(
    <button  onClick={onClick()} className="bg-purple-500 px-4 py-2 rounded-[5px] hover:bg-purple-200 hover:text-purple-800 ">
      {buttonName}
    </button>
  )
} 