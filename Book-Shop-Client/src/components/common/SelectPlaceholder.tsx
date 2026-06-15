import { SelectTrigger, SelectValue } from "../ui/select";

const SelectPlaceholder = ({ text }: any) => {
  return (
    <SelectTrigger className="py-6 w-full border-gray-400">
      <SelectValue placeholder={text} />
    </SelectTrigger>
  );
};

export default SelectPlaceholder;
