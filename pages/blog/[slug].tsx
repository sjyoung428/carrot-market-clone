import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

interface PostProps {
  post: string;
}

const Post: NextPage<PostProps> = ({ post }) => {
  console.log(post);
  return <>{post}</>;
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

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content); // markdown => html
  return {
    props: {
      post: value,
    },
  };
};

export default Post;
