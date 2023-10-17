
import { FC, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Switch,
} from "@chakra-ui/react"

import * as anchor from "@project-serum/anchor"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useWorkspace } from "workspace";
import { redirect, useRouter } from "next/navigation";



export const PostView: FC = ({ }) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const workspace = useWorkspace()
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const program = workspace.program
  const toPage = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!publicKey || !program) {
      alert("Please connect your wallet!")
      return
    }

    console.log(title, description)


    const blogAcc = anchor.web3.Keypair.generate();
    const tx = await program.methods.postBlog(title, description).accounts(
      {
        blog: blogAcc.publicKey,
        author: publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([blogAcc]).rpc()

    // await program.provider.connection.confirmTransaction(tx);
    const latestBlockHash = await program.provider.connection.getLatestBlockhash();

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: tx,
    });

    console.log("Your transaction signature", tx);
    const urlPost = `contents/${blogAcc.publicKey.toBase58()}`
    console.log(urlPost)
    toPage.push(urlPost)
    //redirect(urlPost)
  }



  return (
    <Box as="h1" color="white" ml={4} mt={8}
      p={10}
      display={{ md: "flex" }}

      borderWidth={1}
      margin={2}
      justifyContent="center"
      bgColor={"white"}
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel color="gray.200"> Title</FormLabel>
          <Input
            id="title"
            width="100%"
            height="40px"
            backgroundColor="black"

            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200"> </FormLabel>
          <Textarea
            id="content"
            color="gray.400"
            width="100%"
            height="200px"
            backgroundColor="black"
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </FormControl>

        <Button width="full" mt={4} type="submit">
          Submit
        </Button>
        <button
          className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
          onClick={handleSubmit} disabled={!program}
        >
          <span className="block group-disabled:hidden" >
            Postar
          </span>
        </button>
      </form>
    </Box>
  )


};
