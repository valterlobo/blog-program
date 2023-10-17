use anchor_lang::prelude::*;

declare_id!("26wcvZXot16KQvfc9N8aTW4KhpmbYWUu469fEfny3d6d");

#[program]
pub mod blog_program {
    use super::*;

    pub fn post_blog(ctx: Context<PostBlog>, title: String, content: String) -> Result<()> {
        let blog: &mut Account<Blog> = &mut ctx.accounts.blog;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if title.chars().count() > 50 {
            return err!(ErrorCode::TitleTooLong);
        }

        if content.chars().count() > 280 {
            return err!(ErrorCode::ContentTooLong);
        }

        blog.author = *author.key;
        blog.timestamp = clock.unix_timestamp;
        blog.title = title;
        blog.content = content;

        msg!("Blog Account Created");
        msg!("Current Blog: { }", blog.title);

        Ok(())
    }
}
#[derive(Accounts)]
pub struct PostBlog<'info> {
    #[account(init, payer = author, space = Blog::LEN)]
    pub blog: Account<'info, Blog>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Blog {
    pub author: Pubkey,
    pub timestamp: i64,
    pub title: String,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TITLE_LENGTH: usize = 80 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 1200 * 4; // 1200 chars max.

impl Blog {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TITLE_LENGTH // Title.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided title should be 50 characters long maximum.")]
    TitleTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
