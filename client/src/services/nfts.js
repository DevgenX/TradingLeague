import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production" ? "/api/posts" : `${devApiUrl}/posts`;

export const getNFTsFeed = async (address) => {
  const res = axios.get(
    `https://testnets-api.opensea.io/api/v1/assets?owner=${address}`
  );

  return res;
};

export const getTokenId = async (address) => {
  const res = axios.get(
    `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85&address=${address}&page=1&offset=100&apikey=KWNZW76DPJHCDT4U6VNJAVD56JFANE36FI`
  );

  return res;
};

export const getTokenInfo = async (tokenID) => {
  const res = axios.get(
    `https://api.looksrare.org/api/v1/tokens?collection=0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85&tokenId=${tokenID}`
  );

  return res;
};

export default {
  getNFTsFeed,
};
