const items = [
  {
    type:"radio",
    id: "uniqueID",
    name:"testName", //if null id is using for it
    label:"Sample label",
    placeholder: "write something",
    required:false,
    rules:[],
    startIcon:null,
    endIcon:null,
    classNames: "testClass",
    labelClasses:"",
    children:[],
  }
];

export default function TestCreatedForm() {
  const defaultInputClasses = `border border-gray-300 outline-none 
  px-[15px] py-[10px] text-gray-500 rounded-md w-[100%]`;

  return(
    <form className="w-[100%] grid gap-5 grid-cols-2">
      {
        items.map((item)=> (
          <div key={"a"} className="form-controller">
            {
              item.type === "radio" ? "" :
                item.type === "file" ? "" :
                  item.type === "select" ? "" :
                    <>
                      <label htmlFor={item.id}></label>
                      <input 
                        className={`${defaultInputClasses} ${item.classNames}`}
                        id={item.id}
                        name={item.name || item.id}
                        placeholder={item.placeholder}
                        type={item.type}
                      />
                    </>
            }
          </div>
        ))
      }
    </form>
  );
}