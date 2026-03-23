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
      if (req.query.params === "detail") {
        const getId = req.query.id;
        const response = await api.get(`/attendance/absent/detail/${getId}`, { headers });
        return res.status(response.status).json(response.data);
      }
      if (req.query.params === "list") {
        const getPage = `page=${req.query.page}`;
        const getLimit = `&limit=${req.query.limit}`;
        const getSearch = req.query.search ? `&search=${req.query.search}` : "";
        const getStatus = req.query.status !== "" ? `&status=${req.query.status}` : "";
        const getStartDate = req.query.startDate ? `&startDate=${req.query.startDate}` : "";
        const getEndDate = req.query.endDate ? `&endDate=${req.query.endDate}` : "";
        const getType = req.query.type ? `&type=${req.query.type}` : "";
        const getQuery = `${getPage}${getLimit}${getSearch}${getStatus}${getStartDate}${getEndDate}${getType}`;

        const response = await api.get(`/attendance/absent?${getQuery}`, { headers });
        return res.status(response.status).json(response.data);
      }
    }

    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return apiException(error, res);
  }
}
