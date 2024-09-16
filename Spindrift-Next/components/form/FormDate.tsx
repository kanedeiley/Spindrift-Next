'use client'
import { useState } from 'react'
import { DatePicker } from '../ui/DatePicker';
import { Label } from '../ui/label';


type FormDate = {
  name: string;
  label?: string;
  className?: string;
};


function FormDate(props: FormDate) {
  const { label, name, className } = props;
  return (
<div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
   <DatePicker name={name}/>
  </div>
  )}

  export default FormDate
  