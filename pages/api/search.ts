import { NextApiRequest, NextApiResponse } from "next";
import { fetchQueriedSpots } from "@/utils/actions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if( req.method === "GET"){
    try {
      const { q = "", page=1} = req.query;
      if(typeof q !== "string"){
        throw new Error("Invalid Request")
      }
      const spots = await fetchQueriedSpots({query:q as string, page: page as number})
      res.status(200).json(spots);
    } catch (error) {
      res.status(500).json({ error: "Error fetching spots" });
    }
  }
}
