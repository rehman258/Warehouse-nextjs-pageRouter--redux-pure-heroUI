// import { ActionMeta } from "reaact-select";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
interface CustomReactSelectProps<T> {
  options?: T[];
  getOptionValue?: (_option: T) => string;
  getOptionLabel?: (_option: T) => string;
  onChange?: (_selected: T | null) => void;
  placeholder?: string;
  // ... other react-select props you need
}
export default function CustomReactSelect<T>({
  options = [] as T[],
  placeholder,
  getOptionValue,
  getOptionLabel,
  onChange,  
}:CustomReactSelectProps<T>) {
  return (
    <Select 
      isMulti
      className="w-[200px] cursor-pointer"
      classNames={{
        input:()=>"cursor-pointer",
      }} 
      getOptionLabel={getOptionLabel as (_option: unknown) => string}
      getOptionValue={getOptionValue as (_option: unknown) => string}
      options={options}
      placeholder={placeholder}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: "var(--radius-lg)"
        })
      }}
      onChange={(newValue: unknown) => {
        onChange?.(newValue as T | null);
      }}
      onMenuClose={() => {}}
      onMenuOpen={() => {}} 
    />
  );
}
