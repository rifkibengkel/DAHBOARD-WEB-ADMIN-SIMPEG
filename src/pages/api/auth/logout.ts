import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { apiException, sessionOptions } from "@/libs/commons";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SessionInit>(req, res, sessionOptions);

  try {
    if (req.method === "POST") {
      session.destroy();
      return res.status(200).json("ok");
    }

    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return apiException(error, res);
  }
}
