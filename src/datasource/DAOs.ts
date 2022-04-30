import DeSo from './DeSo';

class DAOs extends DeSo {
  /**
   *
   * @param publicKey {String}
   */
  async getDAOHoldingsForPublicKey(
    publicKey: string,
    lastPublicKey: string = ''
  ) {
    if (!publicKey) {
      throw new Error('publicKey is required');
    }

    const response = await this.client.post(
      '/api/v0/get-hodlers-for-public-key',
      {
        PublicKeyBase58Check: publicKey,
        Username: '',
        LastPublicKeyBase58Check: lastPublicKey,
        NumToFetch: 0,
        FetchHodlings: true,
        FetchAll: true,
        IsDAOCoin: true,
      }
    );

    return response.data;
  }
}

export default DAOs;
