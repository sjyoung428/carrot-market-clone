import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface BlogPost {
  title: string;
  date: string;
  category: string;
}

const Blog: NextPage<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <Layout title="My Blog">
      <h1 className="text-lg font-semibold">Hi</h1>
      {posts.map((post, index) => (
        <div className="mb-5" key={index}>
          <span className="text-lg text-red-500">{post.title}</span>
          <div>
            <span>
              {post.category} / {post.category}
            </span>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export const getStaticProps = () => {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });

  return {
    props: {
      posts: blogPosts.reverse(),
    },
  };
};

export default Blog;
