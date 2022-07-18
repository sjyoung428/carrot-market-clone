import withHandler from "@libs/server/api/withHandler";
import { withAPISession } from "@libs/server/api/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: Number(id.toString()),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    stream,
  });
};

export default withAPISession(
  withHandler({
    methods: ["GET"],
    callback: handler,
  })
);
