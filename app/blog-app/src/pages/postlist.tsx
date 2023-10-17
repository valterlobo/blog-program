import type { NextPage } from "next";
import Head from "next/head";
import { PostListView } from "../views";


const PostList: NextPage = (props) => {
  return (
    <div className="flex flex-row justify-center">
      <Head>
        <title> Post Blog</title>
        <meta
          name="Post blog"
          content="Blog List Functionality"
        />
      </Head>
      <PostListView />
    </div>
  );
};

export default PostList;