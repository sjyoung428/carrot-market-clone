import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;

// hot reload 할 때 client 인스턴스가 중복 생성되지 않게 설정
