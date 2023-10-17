import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useCallback, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWorkspace } from "workspace";
import { PublicKey } from '@solana/web3.js'


const Content: NextPage = (props) => {
    const router = useRouter()

    const { publicKey, signMessage } = useWallet();
    const [blog, setBlog] = useState<any | null>(null)
    const [load, setLoad] = useState<any | null>(null)
    const { program } = useWorkspace()
    const pk =  new PublicKey(router.query.key)
  
    useEffect(() => {
      const fetchBlog = async (pk) => {
  
        if (program) { //program
  
     
          console.log(program)         
          const postPlog = (await program.account.blog.fetch(pk)) ?? {}
          console.log(postPlog)    
          setBlog(postPlog)
          console.log(postPlog)
          setLoad(true)
        }
      }
      fetchBlog(pk)
    }, [load])


  return (
    <div>
      <Head>
        <title> Post Blog</title>
        <meta
          name="Post Blog"
          content="Blog Content Functionality"
        />
      </Head>
      <div>
      <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          {load && blog.title}
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
        <h1>{load && blog.content} </h1>
        </div>
      </div>
    </div>
      </div>
    
    </div>
  );
};

export default Content;