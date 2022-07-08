import withHandler, { IResponse } from "@libs/server/api/withHandler";
import { withAPISession } from "@libs/server/api/withSession";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  console.log(name, price, description, user);
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    product,
  });
}

export default withAPISession(
  withHandler({
    method: "POST",
    callback: handler,
  })
);
