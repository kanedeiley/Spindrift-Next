import { NextApiRequest, NextApiResponse } from "next";
import { fetchQueriedSpots } from "@/utils/actions";
import { serialize } from 'cookie'; // Import the cookie package

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q = "" } = req.query;

  try {
    const spots = await fetchQueriedSpots({ query: q as string, page: 1 });

    // Set the cookie
    const cookie = serialize('__client_uat_xy4_0dai', 'your_cookie_value', {
      httpOnly: true, // Make it inaccessible to JavaScript
      secure: process.env.NODE_ENV === 'production', // Use Secure only in production
      sameSite: 'None', // Set SameSite attribute
      path: '/', // Cookie path
    });

    // Set the cookie in the response headers
    res.setHeader('Set-Cookie', cookie);

    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ error: "Error fetching spots" });
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
