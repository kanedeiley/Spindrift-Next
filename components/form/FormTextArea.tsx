import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormTextArea({ name, labelText, defaultValue, placeholder }: TextAreaInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='mb-6 capitalize'>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
        className='leading-loose'
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormTextArea;