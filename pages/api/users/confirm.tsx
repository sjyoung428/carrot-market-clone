import withHandelr, { IResponse } from "@libs/server/api/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const { token } = req.body;

  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!exists) res.status(404).end();
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  res.status(200).end();
};

export default withIronSessionApiRoute(withHandelr("POST", handler), {
  cookieName: "carrotsession",
  password:
    "12312312i3123oi12u3o1u2o3pu12p3uo12u3p12up3u12po3io1p23uopi12u3iop12up3ou12op31io2pu3op12u3op12up3o1",
});
