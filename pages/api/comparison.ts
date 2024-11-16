import { NextApiRequest, NextApiResponse } from "next";
import { fetchChartData } from "@/utils/actions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  if( req.method === "GET"){
    
    try {
      const { id } = req.query;
      const idNum = Number(id);
      const data = await fetchChartData({id: idNum})
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching spots" });
    }
  }
}
