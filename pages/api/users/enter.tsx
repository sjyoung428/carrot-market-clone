import withHandelr from "@libs/client/utils/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(401).end();
  console.log(req.body);
  return res.status(200).end();
};

export default withHandelr("POST", handler);
