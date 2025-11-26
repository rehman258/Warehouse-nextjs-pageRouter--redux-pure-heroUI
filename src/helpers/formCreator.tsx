const items = [
  {
    type:"checkbox",
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
    onChange:()=>{},
  },
  {
    type:"file",
    id: "uniqueID2",
    name:"testName2", //if null id is using for it
    label:"Sample label",
    placeholder: "write something",
    required:false,
    rules:[],
    startIcon:null,
    endIcon:null,
    classNames: "testClass",
    labelClasses:"",
    children:[],
    onChange:()=>{},
  },
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
    onChange:()=>{},
  },
  {
    type:"select",
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
    children:[
      { value:1 },
      { value:2 },
      { value:3 },
      { value:4 },
      { value:5 },
    ],
    onChange:()=>{},
  },
  {
    type:"text",
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
    onChange:()=>{},
  },
];

export default function TestCreatedForm() {
  const defaultInputClasses = `border border-gray-300 outline-none 
  px-[15px] py-[10px] text-gray-500 rounded-md`;

  return(
    <form className="w-[100%] grid gap-5 grid-cols-2">
      {
        items.map((item)=> (
          <div key={"a"} className="form-controller flex flex-col items-start">
            {
              item.type === "radio" ? "" :
                item.type === "file" ? "" :
                  item.type === "select" ?  
                    <>
                      <label 
                        className="font-medium text-[.825rem] cursor-pointer" 
                        htmlFor={item.id}>
                        {item.label}
                      </label>
                      <select id={item.id} name={item.name || item.id}>
                        {
                          item.children.map((selectOpt:{value:string|number})=>(
                            <option key={selectOpt.value}>
                              {selectOpt.value}
                            </option>
                          ))
                        }
                      </select>
                    </>
                    :
                    <>
                      <label 
                        className="font-medium text-[.825rem] cursor-pointer" 
                        htmlFor={item.id}>
                        {item.label}
                      </label>
                      <input 
                        className={`${defaultInputClasses} ${item.classNames}`}
                        id={item.id}
                        name={item.name || item.id}
                        placeholder={item.placeholder}
                        type={item.type}
                        onChange={item.onChange}
                      />
                    </>
            }
          </div>
        ))
      }
    </form>
  );
}