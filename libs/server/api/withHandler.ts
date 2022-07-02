import { NextApiRequest, NextApiResponse } from "next";

export interface IResponse {
  ok: boolean;
  [key: string]: any;
}

const withHandler = (
  method: "GET" | "POST" | "DELETE",
  callback: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (method !== method) return res.status(405); // GET | POST | DELETE 이 아닐 때
    try {
      await callback(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
};

export default withHandler; // 메소드 체크 및 에러 핸들러
