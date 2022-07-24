import { NextRequest, userAgent } from "next/server";
// import { NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  console.log(userAgent(req));
};
