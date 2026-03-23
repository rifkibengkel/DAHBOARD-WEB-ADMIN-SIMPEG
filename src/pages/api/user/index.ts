import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { api, apiException, sessionOptions } from "@/libs/commons";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SessionInit>(req, res, sessionOptions);

  try {
    const headers = {
      Authorization: session.token,
    };

    if (req.method === "GET") {
      const response = await api.get(`/user`, { headers });
      return res.status(response.status).json(response.data);
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return apiException(error, res);
  }
}
