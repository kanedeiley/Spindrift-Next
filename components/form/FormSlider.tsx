'use client'
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { useState } from 'react';
import { Indicator } from './Indicator';


type FormSlider = {
  name: string;
  label?: string;
  className?: string;
  defaultValue: number[];
  max?: number;
    step?: number;
};

function FormSlider(props: FormSlider) {
  const { label, name, className, defaultValue, step, max } = props;
  const [height,setHeight] = useState(defaultValue[0])
  return (
<div className={`${className}`}>
    <div className="flex flex-row gap-8 align-center ">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Indicator value={height} />
    </div>
   <Slider onValueChange={(i) =>{
    setHeight(i[0])
   }} name={name} className="mt-4" max={max} defaultValue={defaultValue} step={step} />
  </div>
  )}

  export default FormSlider
  