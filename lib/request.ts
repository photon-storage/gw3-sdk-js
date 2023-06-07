import axios from "axios";
import type { IsEqual, SetRequired } from "type-fest";

import { sign } from "./utils";

type TRes<T> = {
  code: number;
  msg?: string;
  data?: T;
};
export type PhotonRes<T = any> = IsEqual<T, any> extends true
  ? TRes<T>
  : SetRequired<TRes<T>, "data">;

export interface PhotonListRes<T = any> {
  code: number;
  msg?: string;
  data: T[];
  total: number;
}

const timeout = 1000 * 60 * 5;

export function getIpfsPath(
  baseURL: string,
  size: number,
  key: string,
  secret: string
) {
  const ts = Math.floor(Date.now() / 1000).toString()
  console.log(ts)
  const url = `/ipfs/?size=${size}&ts=${ts}`;

  return axios.post(url, undefined, {
    baseURL,
    headers: {
      "X-Access-Key": key,
      "X-Access-Signature": sign("POST", url, secret),
    },
    timeout,
  });
}
