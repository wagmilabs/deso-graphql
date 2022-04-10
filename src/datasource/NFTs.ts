import DeSo from './DeSo';

class NFTs extends DeSo {
  /**
   *
   * @param NFTHashHex
   * @returns {Object}
   */
  async getNFTCollectionSummary(
    NFTHashHex: string,
    readerPublicKey: string = ''
  ) {
    const response = await this.client.post(
      '/api/v0/get-nft-collection-summary',
      {
        PostHashHex: NFTHashHex,
        ReaderPublicKeyBase58Check: readerPublicKey,
      }
    );

    return response.data;
  }
}

export default NFTs;
