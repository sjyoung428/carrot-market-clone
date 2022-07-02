import withHandler, { IResponse } from "@libs/server/api/withHandler";
import client from "@libs/server/db/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  console.log(req.session.user, "1");
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password:
    "12312312i3123oi12u3o1u2o3pu12p3uo12u3p12up3u12po3io1p23uopi12u3iop12up3ou12op31io2pu3op12u3op12up3o1;slkgjfdl;gkfsdjg;ldfksjgdsflgjdfklgjdflgjflkgjdgd",
});
