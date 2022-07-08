import { NextApiRequest, NextApiResponse } from "next";

export interface IResponse {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface IConfig {
  methods: method[];
  callback: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

const withHandler = ({ methods, callback, isPrivate = true }: IConfig) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && !methods.includes(req.method as any))
      return res.status(405); // GET | POST | DELETE 이 아닐 때
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
