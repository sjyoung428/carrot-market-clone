import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface BlogPost {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <Layout title="My Blog">
      <h1 className="text-lg font-semibold">Hi</h1>
      {posts.map((post, index) => (
        <div className="mb-5" key={index}>
          <Link href={`/blog/${post.slug}`}>
            <a>
              <span className="text-lg text-red-500">{post.title}</span>
              <div>
                <span>
                  {post.category} / {post.category}
                </span>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export const getStaticProps = () => {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split("."); // .md 제거

    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts: blogPosts.reverse(),
    },
  };
};

export default Blog;
