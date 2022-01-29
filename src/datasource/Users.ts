import DeSo from './DeSo';

class Users extends DeSo {
  /**
   *
   * @param noErrorOnMissing
   * @param publicKey
   * @param username
   * @returns
   */
  public async getSingleProfile(
    noErrorOnMissing: boolean = false,
    publicKey: string = '',
    username: string = ''
  ) {
    const response = await this.client.post('/api/v0/get-single-profile', {
      NoErrorOnMissing: noErrorOnMissing,
      PublicKeyBase58Check: publicKey,
      Username: username,
    });

    return response.data;
  }
}

export default Users;
