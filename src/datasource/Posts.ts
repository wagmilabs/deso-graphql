import DeSo from './DeSo';

class Posts extends DeSo {
  /**
   *
   * @param postHashHex
   * @param readerPublicKey
   * @param addGlobalFeedBool
   * @param commentLimit
   * @param commentOffset
   * @param fetchParents
   * @param loadAuthorThread
   * @param threadLeafLimit
   * @param threadLevelLimit
   */
  public async getSinglePost(
    postHashHex: string,
    readerPublicKey: string = '',
    addGlobalFeedBool: boolean = false,
    commentLimit: number = 10,
    commentOffset: number = 0,
    fetchParents: boolean = false,
    loadAuthorThread: boolean = true,
    threadLeafLimit: number = 1,
    threadLevelLimit: number = 2
  ) {
    const response = await this.client.post('/api/v0/get-single-post', {
      AddGlobalFeedBool: addGlobalFeedBool,
      CommentLimit: commentLimit,
      CommentOffset: commentOffset,
      FetchParents: fetchParents,
      LoadAuthorThread: loadAuthorThread,
      PostHashHex: postHashHex,
      ReaderPublicKeyBase58Check: readerPublicKey,
      ThreadLeafLimit: threadLeafLimit,
      ThreadLevelLimit: threadLevelLimit,
    });

    return response.data;
  }

  /**
   *
   * @param publicKey
   * @param username
   * @param lastPostHashHex
   * @param numToFetch
   * @param mediaRequired
   * @returns
   */
  public async getPostsForUser(
    publicKey: string = '',
    username: string = '',
    lastPostHashHex: string = '',
    numToFetch: number = 10,
    mediaRequired: boolean = false
  ) {
    const response = await this.client.post(
      '/api/v0/get-posts-for-public-key',
      {
        PublicKeyBase58Check: publicKey,
        Username: username,
        ReaderPublicKeyBase58Check: '',
        LastPostHashHex: lastPostHashHex,
        NumToFetch: numToFetch,
        MediaRequired: mediaRequired,
      }
    );

    return response.data;
  }
}

export default Posts;
