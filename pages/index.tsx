import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/hooks/useUser";
import { Product } from "@prisma/client";
import { NextPage } from "next";
import useSWR from "swr";
import client from "@libs/server/db/client";

export interface ProductWithFavorite extends Product {
  _count: {
    Favorite: number;
  };
}

interface ProductsResponse {
  ok: true;
  products: ProductWithFavorite[];
}

const Home: NextPage<{ products: ProductWithFavorite[] }> = ({ products }) => {
  const { user, isLoading } = useUser();
  // const { data } = useSWR<ProductsResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            hearts={product._count?.Favorite}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await client.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
