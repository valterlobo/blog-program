// TODO: SignMessage
import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback, useState, useEffect } from 'react';
import { notify } from "../utils/notifications";
import { useWorkspace } from "../workspace"
import Link from 'next/link';

export const PostList: FC = () => {
  const { publicKey, signMessage } = useWallet();
  const [posts, setPosts] = useState<any | null>(null)
  const [load, setLoad] = useState<any | null>(null)
  const { program } = useWorkspace()


  useEffect(() => {
    const fetchAccounts = async () => {

      if (program) { //program


        console.log(program)
        const accounts = (await program.account.blog.all()) ?? []
        console.log(accounts)

        const sort = [...accounts].sort((a, b) =>
          a.account.title > b.account.title ? 1 : -1
        )
        const postList = sort;
  
        setPosts(postList)
        console.log(posts)
        setLoad(true)
      }
    }
    fetchAccounts()
  }, [load])

  return (
    //maxWidth: "85%" 
    <div className="flex flex-row justify-center">
      <div style={{ display: "flex", flexDirection: "column", gap: "1",  background: "white" }}>
        {load && posts.map((obj: any) => (
          <div style={{ margin: "10px", background: "gray" }}>          
         <Link href= {"/contents/" + obj.publicKey.toBase58()}><h2 className="text-3xl font-bold font-black">{obj.account.title}</h2></Link>
         <Link href= {"/author/" + obj.publicKey.toBase58()}><h1 className="text-1xl font-bold">{obj.account.author.toBase58()}</h1></Link>



          </div>
        ))}



      </div>


    </div>
  );
};
