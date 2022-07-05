import { NextApiRequest, NextApiResponse } from "next";

export interface IResponse {
  ok: boolean;
  [key: string]: any;
}

interface IConfig {
  method: "GET" | "POST" | "DELETE";
  callback: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

const withHandler = ({ method, callback, isPrivate = true }: IConfig) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (method !== method) return res.status(405); // GET | POST | DELETE 이 아닐 때
    if (isPrivate && !req.session.user)
      return res.status(401).json({ ok: false, error: "로그인 하세요" });
    try {
      await callback(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
};

export default withHandler; // 메소드 체크 및 에러 핸들러
