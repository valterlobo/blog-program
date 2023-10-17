import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BlogProgram } from "../target/types/blog_program";
import * as assert from "assert";

describe("blog-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.BlogProgram as Program<BlogProgram>;
  const blogAcc = anchor.web3.Keypair.generate();


  it("Is initialized!", async () => {
    // Add your test here.
    //const tx = await program.methods.sendBlog(post_blog).rpc();


    var title = "Developer Dapp Solana - Anchor"
    var content = "Anchor is a framework for Solana's Sealevel runtime providing several convenient developer tools for writing smart contracts."
    const tx = await program.methods.postBlog(title, content).accounts(
      {
        blog: blogAcc.publicKey,
        author: provider.wallet.publicKey,
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

    const blogAccount = await program.account.blog.fetch(blogAcc.publicKey);
    console.log("BLOG:", blogAccount);

  });

  it('can send a new blog from a different author', async () => {
    // Generate another user and airdrop them some SOL.
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    //await program.provider.connection.confirmTransaction(signature);


    const blogAccount = anchor.web3.Keypair.generate();

    var title = "Developer Dapp Solana - Anchor"
    var content = "Anchor is a framework for Solana's Sealevel runtime providing several convenient developer tools for writing smart contracts."
    const tx = await program.methods.postBlog(title, content).accounts(
      {
        blog: blogAccount.publicKey,
        author:  provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([blogAccount]).rpc()

    // Fetch the account details of the created tweet.
    const blogDataAccount = await program.account.blog.fetch(blogAccount.publicKey);

    // Ensure it has the right data.
    assert.equal(blogDataAccount.author.toBase58(), provider.wallet.publicKey.toBase58());
    assert.equal(blogDataAccount.title, title);
    assert.equal(blogDataAccount.content, content);
    assert.ok(blogDataAccount.timestamp);
  });
});
