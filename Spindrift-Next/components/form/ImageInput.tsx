'use client'
import { Label } from "../ui/label";
import {Input} from "../ui/input";

type ImageProps = {
className?: string
}

function ImageInput(props: ImageProps) {
const name = 'image';
const { className } = props;
  return (
    <div className={`${className}`}>
        <Label htmlFor={name} className="capitalize">Image</Label>
        <Input id={name} name={name} type='file' required accept="image/*" className="max-w-xs" />
    </div>
  )
}

export default ImageInput