'use server'

import { imageSchema, journalSchema, profileSchema, validateWithZodSchema } from "./schemas"
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from "./supabase";
import {SearchQuery, ChartDataItem} from "./extratypes"
const getAuthUser = async()=>{
   const user = await currentUser();
   if(!user){
      throw new Error('you must be logged in to access.');
   }
   if(!user.privateMetadata.hasProfile) redirect('/profile/create')
      return user;
}

const getFavoritesUser = async()=>{
   const user = await currentUser();
   if(!user){
      return undefined;
   }
   if(!user.privateMetadata.hasProfile) redirect('/profile/create')
      return user;
}

const renderError = (error:unknown):{message:string}=>{
   console.log(error);
   return {message: error instanceof Error? error.message : 'An error occurred.'};
}

export const createProfileAction = async(prevSTate: any, formData:FormData) =>{
   try{
   const user = await currentUser();
   if(!user) throw new Error('error please login.');

   const rawData = Object.fromEntries(formData);
   const validatedFields = validateWithZodSchema(profileSchema, rawData);   
   await db.profile.create({
      data:{
         clerkId:user.id,
         email:user.emailAddresses[0].emailAddress,
         profileImage:user.imageUrl??'',
         ...validatedFields,
      }
   })
   await clerkClient().users.updateUserMetadata(user.id,{
      privateMetadata:{
         hasProfile:true,
      },
   })
   }
   catch(e){
    return renderError(e);
   }
   redirect('/');
}

export const fetchProfileImageAction = async() =>{
   const user= await currentUser();
   if(!user) return null;

   const profile = await db.profile.findUnique({
      where:{
         clerkId:user.id
      },
      select:{
         profileImage: true
      },
   });
   return profile?.profileImage
};



export const fetchProfileAction = async() =>{
   const user = await getAuthUser();
   const profile = await db.profile.findUnique({
      where:{
         clerkId:user.id,
      },
})
   if(!profile) redirect('profile/create');
   return profile;
};

export const updateProfileAction = async(prevState:any, formData:FormData):Promise<{message:string}> =>{
   const user = await getAuthUser();
   try {
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(profileSchema, rawData);
     await db.profile.update({
       where: {
         clerkId: user.id,
       },
       data: validatedFields,
     });
     revalidatePath('/profile');
     return { message: 'Profile updated successfully' };
   }
   catch(e){
      return renderError(e);
   }
}

export const updateProfileImageAction = async(
   prevState: any,
   formData: FormData
): Promise<{message: string}> => {
   const user = await getAuthUser();
   try{
   const image = formData.get('image') as File;
   const validatedFields = validateWithZodSchema(imageSchema, {image});
   const fullPath = await uploadImage(validatedFields.image);
   await db.profile.update({
      where:{
         clerkId:user.id
      },data:{
         profileImage: fullPath
      }
   })
   revalidatePath('/profile');
   return {message: 'profile image updated successfully.'}
   }
   catch(e){
      return renderError(e)
   }
}

export const createJournalAction = async(
   prevState: any,
   formData: FormData
): Promise<{message: string}> => {
   const user = await getAuthUser();
   const spotID = "000d9c32-c1c2-48b1-861a-7a94de946960"
   try {
      const rawData = Object.fromEntries(formData);
      //const file = formData.get('image') as File;
      console.log(rawData);
      
      const validatedFields = validateWithZodSchema(journalSchema, rawData);
      //const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      //const fullPath = await uploadImage(validatedFile.image);
  
      await db.journal.create({
        data: {
          ...validatedFields,
          profileID: user.id,
          spotID: spotID,
        },
      });
      
    } catch (error) {
      return renderError(error);
    }
    redirect('/journal');
  };


  export const fetchJournalsAction = async() =>{
   const user = await getAuthUser();
    // Fetch all journal records where ProfileID equals the UserId from the user constant
    const journals = await db.journal.findMany({
      where: {
        profileID: user.id, // Assuming ProfileID is the field in the journal table
      },
      orderBy: {
         sessionStart: 'desc',
       },
       include: {
         spot: {
            select:{
               name: true,
            },
         },
       },
    });
    return journals;
}


export const fetchSpotsAction = async() =>{
   const spots = await db.spot.findMany();
   return spots;
}


export const fetchFavoritesAction = async() =>{
   const user = await getFavoritesUser();
   if(user === undefined){
      return []
   }
   const spots = await db.favorite.findMany({ where: {
      profileID: user.id,
    },
   include: {
      spot: {
      select: {
         name: true,
         },
      },
   }, 
   });
   return spots;
};


export const fetchQueriedSpots = async ({query, page}:SearchQuery ) =>{
   const pageSize = 2;
   const skip = (page - 1) * pageSize; // Calculate how many records to skip
  // Query the database
  const spots = await db.spot.findMany({
    where: {
      name: {
        contains: query, // Search by name (can also use `startsWith` or `endsWith`)
        mode: 'insensitive', // Make the search case-insensitive
      },
    },
    skip: skip, // Skip the previous pages' items
    take: pageSize, // Take only the number of records for the current page
    select: {
      name: true, // Select only the 'name' column
    },
   });

  // Count total records to calculate total pages
  const totalCount = await db.spot.count({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  // Return the results along with pagination data
  return {
    spots,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export const fetchChartData = ({id}:{id: number}):ChartDataItem[] => {
      const chartData = [
         { date: "2024-04-01", wave_height: 4, wind: 4 },
         { date: "2024-04-01", wave_height: 222, wind: 150 },
         { date: "2024-04-01", wave_height: 222, wind: 150 },
         { date: "2024-04-01", wave_height: 222, wind: 150 },
         { date: "2024-04-01", wave_height: 222, wind: 150 },
         { date: "2024-04-01", wave_height: 222, wind: 150 },
         { date: "2024-04-01", wave_height: 222, wind: 150 },
         { date: "2024-04-01", wave_height: 222, wind: 150 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-02", wave_height: 97, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-03", wave_height: 100, wind: 180 },
         { date: "2024-04-04", wave_height: 102, wind: 140 },
         { date: "2024-04-04", wave_height: 102, wind: 140 },
         { date: "2024-04-04", wave_height: 102, wind: 140 },
         { date: "2024-04-04", wave_height: 102, wind: 140 },
         { date: "2024-04-04", wave_height: 102, wind: 140 },
         { date: "2024-04-04", wave_height: 102, wind: 140 },
       ];
       return chartData;
 };
 



