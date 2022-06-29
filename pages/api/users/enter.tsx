import withHandelr from "@libs/server/api/withHandler";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(401).end();
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: "익명",
  //     ...payload,
  //   },
  //   update: {},
  // });
  const token = await client.token.create({
    data: {
      payload: "123", //랜덤
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "익명",
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);

  return res.status(200).end();
};

export default withHandelr("POST", handler);
