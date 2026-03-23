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
      if (req.query.params === "detail_branch") {
        const getId = req.query.id;
        const response = await api.get(`/master/cabang/${getId}`, { headers });
        return res.status(response.status).json(response.data);
      }
      if (req.query.params === "list_menu") {
        const response = await api.get(`/master/menu`, { headers });
        return res.status(response.status).json(response.data);
      }
      if (req.query.params === "list_branch") {
        const response = await api.get(`/master/cabang`, { headers });
        return res.status(response.status).json(response.data);
      }
    }
    if (req.method === "POST") {
      if (req.query.params === "add_branch") {
        const response = await api.post(`/master/cabang`, req.body, { headers });
        return res.status(response.status).json(response.data);
      }
      if (req.query.params === "update_branch") {
        const response = await api.put(`/master/cabang`, req.body, { headers });
        return res.status(response.status).json(response.data);
      }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return apiException(error, res);
  }
}
