import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(401).end();
  console.log(req.body.email);
  res.status(200).end();
};

export default handler;
