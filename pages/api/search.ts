// pages/api/searchSpots.ts (API route)

import { NextApiRequest, NextApiResponse } from "next";
import { fetchQueriedSpots } from "@/utils/actions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q = ""} = req.query;
  try {
    const spots = await fetchQueriedSpots({query:q as string, page: 1})
    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ error: "Error fetching spots" });
  }
}