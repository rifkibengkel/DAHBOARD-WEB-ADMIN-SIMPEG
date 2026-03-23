import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { api, apiException, sessionOptions } from "@/libs/commons";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SessionInit>(req, res, sessionOptions);

  try {
    if (req.method === "POST") {
      const payload = {
        username: req.body.username,
        password: req.body.password,
        media: "400",
        version: "1",
        device: {
          imei: "string",
          devicetype: "string",
          language: "string",
          manufacturer: "string",
          model: "string",
          os: "string",
          osVersion: "string",
          region: "string",
          sdkVersion: "string",
          heightdips: 0,
          heightpixels: 0,
          scale: 0,
          widthdips: 0,
          widthpixels: 0,
          player_id: "string",
          firebase_id: "string",
        },
      };
      const response = await api.post("/auth/login", payload);

      session.isLoggedIn = true;
      session.token = response.data.data.token;
      await session.save();

      return res.status(response.status).json(response.data);
    }

    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return apiException(error, res);
  }
}
