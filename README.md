# DeSoQl

A DeSo GraphQL wrapper sitting on top of the DeSo HTTP API.

# Getting started

Install all required packages by doing `yarn install`.

The default node api used is `https://diamondapp.com` but you are free to change that in the .env file.

You can launch a dev environment by doing `npm run dev`.

The GraphQL Playground will open up and you can write your first query, example:

```
{
  postsForUser(input: { Username: "nader" }) {
    Posts {
      PostHashHex
      Body
      CommentCount
      LikeCount
      TimestampNanos
    }
  }
}
```
