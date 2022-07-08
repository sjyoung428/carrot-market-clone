import withHandler, { IResponse } from "@libs/server/api/withHandler";
import { withAPISession } from "@libs/server/api/withSession";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.favorite.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });

  if (alreadyExists) {
    await client.favorite.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({ ok: true });
}

export default withAPISession(
  withHandler({
    methods: ["POST"],
    callback: handler,
  })
);
