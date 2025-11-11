import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const testList = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "elephant", label: "Elephant" },
  { value: "lion", label: "Lion" },
  { value: "tiger", label: "Tiger" },
  { value: "giraffe", label: "Giraffe" },
  { value: "dolphin", label: "Dolphin" },
  { value: "penguin", label: "Penguin" },
  { value: "zebra", label: "Zebra" },
  { value: "shark", label: "Shark" },
  { value: "whale", label: "Whale" },
  { value: "otter", label: "Otter" },
  { value: "crocodile", label: "Crocodile" },
];

export default function CustomReactSelect({ options=testList }:{options?:unknown[]}) {
  return (
    <Select 
      isMulti
      className="w-[200px] cursor-pointer" 
      classNames={{
        input:()=>"cursor-pointer",
      }}
      options={options}
      placeholder="Select Status"
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: "var(--radius-lg)"
        })
      }}
      onMenuClose={() => {}}
      onMenuOpen={() => {}} 
    />
  );
}
