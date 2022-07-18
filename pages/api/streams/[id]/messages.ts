import withHandler from "@libs/server/api/withHandler";
import { withAPISession } from "@libs/server/api/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    body,
    session: { user },
  } = req;
  const message = await client.message.create({
    data: {
      message: body.message,
      stream: {
        connect: {
          id: Number(id.toString()),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    message,
  });
};

export default withAPISession(
  withHandler({
    methods: ["POST"],
    callback: handler,
  })
);
