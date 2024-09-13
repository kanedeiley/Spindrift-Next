import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: 'first name must be at least 2 characters',
  }).max(45, {
    message: 'first name must be less than 45 characters'
  }),
  lastName: z.string().min(2, {
    message: 'last name must be at least 2 characters',
  }).max(45, {
    message: 'last name must be less than 45 characters'
  }),
  username: z.string().min(2, {
    message: 'username must be at least 2 characters',
  }).max(45, {
    message: 'username must be less than 45 characters'
  }),
});


export const journalSchema = z.object({
  entry: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },{message: "Entry must be longer than between 10 & 1000 words"}),
    sessionStart:  z.coerce.date(),
    sessionLength: z.coerce.number().int().min(1, {message: "session must have been longer than a minute."}),
    rating: z.coerce.number({message: "rating must be 0-5"}),
    boardType: z.string().min(2,{message: "please select a board type."}),
    highlights: z.string({message: "highlights is erroring"}),
    heightRating: z.coerce.number({message: "height is erroring"}),
    fatigueRating: z.coerce.number({message: "Fatigue is erroring"}),
    finSetup:  z.string().min(2,{message: "please select a fin setup."}),
    boardLength: z.coerce.number().int().min(10, {message: "board cannot be that short."}),
    boardLiters: z.coerce.number().int().min(10, {message: "board cannot be that light."}),
    swimwear: z.string().min(2,{message: "please select a wetsuit option."}),  
})

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  console.log(data)
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);

    throw new Error(errors.join(', '));
  }
  return result.data;
}
export const imageSchema = z.object({
  image: validateFile(),
});



function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFilesTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, 'File size must be less than 1 MB')
    .refine((file) => {
      return (
        !file || acceptedFilesTypes.some((type) => file.type.startsWith(type))
      );
    }, 'File must be an image');
}