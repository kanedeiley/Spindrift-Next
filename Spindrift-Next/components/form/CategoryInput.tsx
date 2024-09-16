'use client';
import { useState } from 'react';
import { Category, highlights, swimwear } from '@/utils/categorytypes';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '../ui/label';

function CategoriesInput({ defaultValue, name, className }: { defaultValue?: Category[], name: string, className?: string}) {
    const lists: { [key: string]: Category[] } = {
        highlights,
        swimwear
      };
  
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    defaultValue || lists[name]
  );

  const handleChange = (category: Category) => {
    setSelectedCategories((prev) => {
      return prev.map((c) => {
        if (c.name === category.name) {
          return { ...c, selected: !c.selected };
        }
        return c;
      });
    });
  };

  return (
    <section className={`${className}`}>
        <Label className='capitalize'>{name}</Label>
      <input
        type='hidden'
        name={name}
        value={JSON.stringify(selectedCategories)}
      />
      <div className='grid grid-cols-2 gap-4 mt-6'>
        {selectedCategories.map((category) => (
          <div key={category.name} className='flex items-center space-x-2'>
            <Checkbox
              id={category.name}
              checked={category.selected}
              onCheckedChange={() => handleChange(category)}
            />
            <label
              htmlFor={category.name}
              className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'
            >
              {category.name}
              <category.icon className='w-4 h-4' />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
export default CategoriesInput;