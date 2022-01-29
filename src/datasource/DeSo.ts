require('dotenv').config();
import axios from 'axios';

const DEFAULT_NODE = process.env.NODE_API_URL || 'https://diamondapp.com';

class DeSo {
  public nodeUrl: string;

  constructor(nodeUrl = DEFAULT_NODE) {
    this.nodeUrl = nodeUrl;
  }

  get client() {
    return axios.create({
      baseURL: this.nodeUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
    });
  }
}

export default DeSo;
