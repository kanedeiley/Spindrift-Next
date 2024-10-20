import { NextApiRequest, NextApiResponse } from "next";
import { fetchQueriedSpots } from "@/utils/actions";
import { serialize } from 'cookie'; // Import the cookie package

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if( req.method === "GET"){
    try {
      const { q = ""} = req.query;
      if(typeof q !== "string"){
        throw new Error("Invalid Request")
      }
      const spots = await fetchQueriedSpots({query:q as string, page: 1})
      res.status(200).json(spots);
    } catch (error) {
      res.status(500).json({ error: "Error fetching spots" });
    }

  const { q = "" } = req.query;
  }
}





// // pages/api/searchSpots.ts (API route)

// import { NextApiRequest, NextApiResponse } from "next";
// import { fetchQueriedSpots } from "@/utils/actions";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { q = ""} = req.query;
//   try {
//     const spots = await fetchQueriedSpots({query:q as string, page: 1})
//     res.status(200).json(spots);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching spots" });
//   }
// }
