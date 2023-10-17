import type { NextPage } from "next";
import Head from "next/head";
import { PostView } from "../views";

const Post: NextPage = (props) => {
  return (
    <div className="md:w-full text-2x1 md:text-2xl text-center text-slate-100 my-2">
      <Head>
        <title> Post Blog</title>
        <meta
          name="Form post blog"
          content="Post Functionality"
        />
      </Head>
      <PostView />
    </div>
  );
};

export default Post;