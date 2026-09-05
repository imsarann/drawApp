import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      Welcome to excalidraw frontend
    
    <div>

      <Button buttonName={"Done"} onClick={() => console.log("button clicked 11")  }></Button>
    </div>
    <div>
      <Input type={"text"} placeholder={"Name"} ></Input>
    </div>
    </div>
    
  );
}




