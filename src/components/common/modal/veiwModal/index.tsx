import { Button } from "@heroui/react";
import Image from "next/image"; 

export default function ViewModal(
  { 
    open, 
    details,
    closeModal,
  }:{
    open:boolean;
    details:[string,string][];
    closeModal: (_isOpen:boolean) => void;
  }
) {

  const selfCloseHandler =(e:unknown)=>{
    const { target } = e as MouseEvent; 
    if(target instanceof HTMLElement){
      if(
        !target?.classList.contains("modal-dialog") &&
        !target?.classList.contains("close-modal")
      ) return;
    }
    closeModal(false);
  };

  return (
    <dialog
      className="modal-dialog bg-[#00000099] fixed h-[100%] w-[100%] z-[99] top-[0%]"
      open={open}
      onClick={selfCloseHandler}
    >
      <div className="absolute shadow bg-[#fff] left-[50%] transform translate-x-[-50%]
      top-[20%] min-w-[500px] p-[2rem] rounded-md">
        <div className="modal-area-header mb-[2rem]  flex items-center justify-between">
          <span className="capitalize font-medium text-[1.5rem]">
            {"view tictac inventory item"}
          </span>
          <Button isIconOnly className="bg-transparent rounded-full close-modal" onPress={selfCloseHandler}>
            <Image
              alt={"close view modal icon"

              }
              height={35}
              src={"/icons/close.svg"}
              width={35}
            />
          </Button>
        </div>
        <div className="modal-area-content flex flex-wrap">
          {
            details.map((detail)=>(
              <div key={detail[0]} className="w-[25%] mb-[1rem]">
                <h6 className="font-medium">{detail[0]}</h6>
                <div className="text-[.825rem] text-gray-500">{detail[1]}</div>
              </div>
            ))
          }
        </div>
      </div>
    </dialog>
  );
}
