import withHandelr from "@libs/server/api/withHandler";
import client from "@libs/server/db/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.status(401).end();
  const { phone, email } = req.body;
  let user;
  if (email) {
    console.log("유저 찾는 중");
    user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      console.log("유저 찾음");
    }
    if (!user) {
      console.log("회원가입함");
      user = await client.user.create({
        data: {
          name: "익명",
          email,
        },
      });
    }
  }
  if (phone) {
    console.log("유저 찾는 중");
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });

    if (user) {
      console.log("유저 찾음");
    }
    if (!user) {
      console.log("회원가입함");
      user = await client.user.create({
        data: {
          name: "익명",
          phone: +phone,
        },
      });
    }
  }

  return res.status(200).end();
};

export default withHandelr("POST", handler);
