export type BlogProgram = {
  "version": "0.1.0",
  "name": "blog_program",
  "instructions": [
    {
      "name": "postBlog",
      "accounts": [
        {
          "name": "blog",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blog",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitleTooLong",
      "msg": "The provided title should be 50 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "The provided content should be 280 characters long maximum."
    }
  ]
};

export const IDL: BlogProgram = {
  "version": "0.1.0",
  "name": "blog_program",
  "instructions": [
    {
      "name": "postBlog",
      "accounts": [
        {
          "name": "blog",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blog",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitleTooLong",
      "msg": "The provided title should be 50 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "The provided content should be 280 characters long maximum."
    }
  ]
};
