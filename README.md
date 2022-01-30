# DeSo GraphQL

A DeSo GraphQL wrapper sitting on top of the DeSo HTTP API.

# What is DeSo (Decentralized Social)

DeSo is a new type of blockchain designed to power Web 3.0 decentralized social networks. Since its inception in 2019, DeSo aims to solve the problems created by present social media centralization. Learn more at [deso.org](https://deso.org).

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
