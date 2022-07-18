import withHandler from "@libs/server/api/withHandler";
import { withAPISession } from "@libs/server/api/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    session: { user },
    body: { name, price, description },
    query: { page },
  } = req;
  const take = 10;
  const skip = (Number(page.toString()) - 1) * 10;

  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  } else if (req.method === "GET") {
    const items = await client.stream.findMany({
      take,
      skip,
    });
    res.json({
      ok: true,
      items,
    });
  }
};

export default withAPISession(
  withHandler({
    methods: ["GET", "POST"],
    callback: handler,
  })
);
