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
   const pageSize = 3;
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
 export const fetchMapSpots = async (p0: { southWestLat: string | string[] | undefined; southWestLng: string | string[] | undefined; northEastLat: string | string[] | undefined; northEastLng:  string | string[] | undefined;}) =>{
     // Convert values to numbers (handles both string and array cases)
  
const southWestLat = Number(Array.isArray(p0.southWestLat) ? p0.southWestLat[0] : p0.southWestLat);
  const southWestLng = Number(Array.isArray(p0.southWestLng) ? p0.southWestLng[0] : p0.southWestLng);
  const northEastLat = Number(Array.isArray(p0.northEastLat) ? p0.northEastLat[0] : p0.northEastLat);
  const northEastLng = Number(Array.isArray(p0.northEastLng) ? p0.northEastLng[0] : p0.northEastLng);
   
   try {
      const spots = await db.spot.findMany({
        where: {
          latitude: {
            gte: southWestLat, // Greater than or equal to SW latitude
            lte: northEastLat, // Less than or equal to NE latitude
          },
          longitude: {
            gte: southWestLng, // Greater than or equal to SW longitude
            lte: northEastLng, // Less than or equal to NE longitude
          },
        },
      });
      return spots;
    } catch (error) {
      console.error("Error fetching spots:", error);
      return [];
    }
 }

 export const fetchSpot = async ({spotID}:{spotID: string}) => {
   const spot = await db.spot.findUnique({
      where:{
         id:spotID,
      },
});
   return spot
 }
 



