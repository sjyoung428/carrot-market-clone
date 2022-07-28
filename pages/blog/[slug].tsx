import Layout from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

interface PostProps<T> {
  post: string;
  data: T;
}

const Post: NextPage<
  PostProps<{ title: string; data: number; category: string }>
> = ({ post, data }) => {
  return (
    <Layout title={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
      {/* string형식의 html코드 변환 */}
    </Layout>
  );
};

export const getStaticPaths = () => {
  const files = readdirSync("./posts").map((file) => {
    const [name, _] = file.split(".");
    return {
      params: {
        slug: name,
      },
    };
  });
  return {
    paths: files,
    fallback: false,
  };
}; // 다이나믹 url에서 getStaticProps 사용하기 위해 필요함 (어떤 url을 사용할 것인지 알려주기)

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, content } = matter.read(`./posts/${context.params?.slug}.md`);
  console.log(data);

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content); // markdown => html
  return {
    props: {
      data,
      post: value,
    },
  };
};

export default Post;
