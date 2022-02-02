import DeSo from './DeSo';

class Users extends DeSo {
  /**
   *
   * @param noErrorOnMissing
   * @param publicKey
   * @param username
   *
   * @returns {Object}
   */
  public async getSingleProfile(
    noErrorOnMissing: boolean = false,
    publicKey: string = '',
    username: string = ''
  ) {
    if (!publicKey && !username) {
      throw new Error('Either publicKey or username must be provided');
    }

    const response = await this.client.post('/api/v0/get-single-profile', {
      NoErrorOnMissing: noErrorOnMissing,
      PublicKeyBase58Check: publicKey,
      Username: username,
    });

    return response.data;
  }

  /**
   *
   * @param publicKey
   * @param username
   * @param limit
   * @param lastPublicKeyBase58Check
   * @param fetchHodlings
   * @param fetchAll
   *
   * @returns {Object}
   */
  public async getHoldersForProfile(
    publicKey: string = '',
    username: string = '',
    limit: number = 25,
    lastPublicKeyBase58Check: string = '',
    fetchHodlings: boolean = false,
    fetchAll: boolean = false
  ) {
    const response = await this.client.post(
      '/api/v0/get-hodlers-for-public-key',
      {
        PublicKeyBase58Check: publicKey,
        Username: username,
        LastPublicKeyBase58Check: lastPublicKeyBase58Check,
        NumToFetch: limit,
        FetchHodlings: fetchHodlings,
        FetchAll: fetchAll,
      }
    );

    return response.data;
  }

  /**
   *
   * @param username
   * @param publicKey
   * @param getFollowers
   * @param lastPublicKeyBase58Check
   * @param limit
   *
   * @returns {Object}
   */
  public async getFollowsStateless(
    username: string = '',
    publicKey: string = '',
    getFollowers: boolean = true,
    lastPublicKeyBase58Check: string = '',
    limit: number = 25
  ) {
    const response = await this.client.post('/api/v0/get-follows-stateless', {
      Username: username,
      PublicKeyBase58Check: publicKey,
      GetEntriesFollowingUsername: getFollowers,
      LastPublicKeyBase58Check: lastPublicKeyBase58Check,
      NumToFetch: limit,
    });

    return response.data;
  }
}

export default Users;
