import got from "got";

import * as configuration from "../configuration";
import buildGotErrorMessage from "../helpers/buildGotErrorMessage";

export interface MoovToken {
  value: string;
  expiresOn: number; // seconds from epoch
}

export interface IMoovService {
  getTransferData(transferID: string): Promise<any>;
  createToken(): Promise<MoovToken>;
}

export class MoovService {
  async getTransferData(transferID: string): Promise<any> {
    const config = configuration.active();
    const token = await this.createToken();
    const url = `${config.moov.apiUrl}/transfers/${transferID}`;

    let transfer: any;
    try {
      transfer = await got({
        url,
        method: "GET",
        searchParams: {
          accountId: config.moov.accountID,
        },
        headers: {
          Authorization: `Bearer ${token.value}`,
          Origin: config.moov.domain,
        },
      }).json();
    } catch (err) {
      const msg = `moov.getTransferData failed: ${buildGotErrorMessage(err)}`;
      throw new Error(msg);
    }

    return transfer;
  }

  async createToken(): Promise<MoovToken> {
    const config = configuration.active();
    const url = `${config.moov.apiUrl}/oauth2/token`;

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
      const msg = `moov.createToken failed: ${url} ${buildGotErrorMessage(err)}`;
      throw new Error(msg);
    }

    const expiresOn = Math.round(new Date().getTime() / 1000) - result.expires_in;

    return {
      value: result.access_token,
      expiresOn,
    };
  }
}