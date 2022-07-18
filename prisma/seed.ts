import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const main = async () => {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 16,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
};

main()
  .catch((error) => console.log(error))
  .finally(() => client.$disconnect());
