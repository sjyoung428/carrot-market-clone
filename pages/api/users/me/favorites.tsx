import withHandler, { IResponse } from "@libs/server/api/withHandler";
import { withAPISession } from "@libs/server/api/withSession";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    session: { user },
  } = req;

  const favorites = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              Favorite: true,
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    favorites,
  });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    callback: handler,
  })
);
