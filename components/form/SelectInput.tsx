import { Label } from '@/components/ui/label';
import { boardType, finSetup } from '@/utils/selecttypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


type SelectProps = {
    className?: string;
    defaultValue?: string;
    name: string;
    label: string;
  };

function SelectInput({className = '',defaultValue = '', name, label}: SelectProps) {
    const lists: { [key: string]: any[] } = {
        boardType,
        finSetup,
      };
    return (
    <div className={`capitalize mb-2 ${className} `}>
      <Label htmlFor={name} className="mb-6 capitalize">
        {label}
      </Label>
      <Select
        defaultValue={defaultValue || lists[name][0].label}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {lists[name].map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                <span className='flex items-center gap-2'>
                   {item.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default SelectInput;