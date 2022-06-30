import withHandelr, { IResponse } from "@libs/server/api/withHandler";
import client from "@libs/server/db/client";
import smtpTransport from "@libs/server/api/email";
import { NextApiRequest, NextApiResponse } from "next";
// import twilio from "twilio";

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  if (req.method !== "POST") res.status(401).end();
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;

  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "익명",
            ...user,
          },
        },
      },
    },
  });

  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!, // phone,
  //     body: `Your login token is ${payload}`,
  //   });
  //   console.log(message);
  // }
  if (email) {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Carrot Market Clone Authentication Email",
      // text: `Authentication Code : ${payload}`,
      html: `Authentication Code : <strong>${payload}</strong>`,
    };
    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(responses);
          return null;
        }
      }
    );
    smtpTransport.close();
    console.log(result);
  }

  return res.status(200).json({ ok: true });
};

export default withHandelr("POST", handler);
