import { NextApiRequest, NextApiResponse } from "next";
import { fetchMapSpots } from "@/utils/actions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if( req.method === "GET"){
        try {
            const { southWestLat, southWestLng, northEastLat, northEastLng } = req.query;
          const spots = await fetchMapSpots({southWestLat, southWestLng, northEastLat, northEastLng})
          res.status(200).json(spots);
        } catch (error) {
          res.status(500).json({ error: "Error fetching spots" });
        }
      }
}
