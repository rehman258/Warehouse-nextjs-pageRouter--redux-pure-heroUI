import { Button } from "@heroui/react";
import Image from "next/image"; 
import TestCreatedForm from "@/helpers/formCreator";
export default function FormModal(
  { 
    open, 
    // details,
    isEditable=false,
    closeModal,
  }:{
    open:boolean;
    isEditable:boolean;
    // details:[string,string][];
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
            {"Edit tictac inventory item"}
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
        <div className="modal-area-content mb-[3rem] flex flex-wrap">
          <TestCreatedForm/>
        </div>
        <div className="actions flex justify-end">
          {
            isEditable ?
              <Button color="primary">
                {"Save"}
              </Button>:
              <Button color="primary">
                {"Submit"}
              </Button>
          }
        </div>
      </div>
    </dialog>
  );
}
