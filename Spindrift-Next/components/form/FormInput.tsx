import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  min?: number;
};

function FormInput(props: FormInputProps) {
  const { label, name, type, defaultValue, placeholder, className, min } = props;
  return (
    <div className={`${className}`}>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Input className='mt-2'
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
        min={min}
      />
    </div>
  );
}
export default FormInput;