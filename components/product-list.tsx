import { ProductWithFavorite } from "pages";
import React from "react";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "favorites" | "sales" | "purchases";
}
interface Record {
  id: number;
  product: ProductWithFavorite;
}

interface ProductListResponse {
  [key: string]: Record[];
}

const ProductList = ({ kind }: ProductListProps) => {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  console.log(data);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.Favorite}
        />
      ))}
    </>
  ) : null;
};

export default ProductList;
