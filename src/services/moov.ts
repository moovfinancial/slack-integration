import got from "got";

import * as configuration from "../configuration";
import buildGotErrorMessage from "../helpers/buildGotErrorMessage";

export interface MoovToken {
  value: string;
  expiresOn: number; // seconds from epoch
}

export async function getTransferData(transferID: string): Promise<any> {
  // TODO: Create token and get transfer data
}

async function createToken(): Promise<MoovToken> {
  const config = configuration.active();
  const url = config.moov.apiUrl + "/oauth2/token";

  let result: any;
  try {
    result = await got({
      url,
      method: "POST",
      form: {
        grant_type: "client_credentials",
        scope: `/ping.read /accounts/${config.moov.accountID}/transfers.read`,
      },
      username: config.moov.publicKey,
      password: config.moov.secretKey,
    }).json();
  } catch (err) {
    const msg = `moov.fetchCredentials failed: ${buildGotErrorMessage(err)}`;
    throw new Error(msg);
  }

  const expiresOn = Math.round(new Date().getTime() / 1000) - result.expires_in;

  return {
    value: result.access_token,
    expiresOn,
  };
}
