import withHandler, { IResponse } from "@libs/server/api/withHandler";
import { withAPISession } from "@libs/server/api/withSession";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    session: { user },
  } = req;

  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  res.json({
    ok: true,
    reviews,
  });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    callback: handler,
  })
);
