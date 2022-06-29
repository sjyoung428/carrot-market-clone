import withHandelr, { IResponse } from "@libs/server/api/withHandler";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  if (req.method !== "POST") res.status(401).end();
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;

  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "익명",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  return res.status(200).json({ ok: true });
};

export default withHandelr("POST", handler);
