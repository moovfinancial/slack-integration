import * as app from "./application";
import * as configuration from "./configuration";
import { Env } from "./services/env";
import { MoovService, IMoovService, MoovToken } from "./services/moov";
import { randomInt, randomUUID, sign } from "crypto";
import got, { Response } from "got";
import buildGotErrorMessage from "./helpers/buildGotErrorMessage";
import { generateSignature } from "./services/authentication";
import { env } from "process";

class MockMoovService implements IMoovService {
  parentService: IMoovService | null = null;

  FakeGetTranserData = (transferID: string): Promise<any> => {
    if (this.parentService) {
      return this.parentService.getTransferData(transferID);
    }
    return Promise.resolve(true);
  };

  FakeCreateToken(): Promise<any> {
    if (this.parentService) {
      return this.parentService.createToken();
    }
    return Promise.resolve(true);
  }

  getTransferData(transferID: string): Promise<any> {
    if (this.FakeGetTranserData != null) {
      return this.FakeGetTranserData(transferID);
    }
    return Promise.resolve(true);
  }
  createToken(): Promise<MoovToken> {
    if (this.FakeCreateToken) {
      return this.FakeCreateToken();
    }
    return Promise.resolve({} as MoovToken);
  }
}

const ReversedTransferPayload = {
  transferID: "ea96962b-cf0c-4409-9ef6-ead3aa7f619a",
  createdAt: "2022-05-13T14:35:15Z",
  createdOn: "2022-05-13T14:35:15Z",
  status: "reversed",
  amount: {
    currency: "USD",
    value: 100,
  },
  facilitatorFee: {
    total: 0,
  },
  source: {
    paymentMethodID: "5cc58d59-a79e-41ad-99f3-7e223ba99eaa",
    paymentMethodType: "ach-debit-fund",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    bankAccount: {
      bankAccountID: "3abc682a-1523-45fb-9776-b14c058fcccf",
      fingerprint: "c22e13fc21f8006b40eb4e6bc215a5e05eff5d98c1136a1ed60890d66bc5c056",
      status: "verified",
      holderName: "Wic Noods",
      holderType: "individual",
      bankName: "VERIDIAN CREDIT UNION",
      bankAccountType: "checking",
      routingNumber: "273976369",
      lastFourAccountNumber: "4333",
    },
    ach: {
      status: "completed",
      traceNumber: "221475788687776",
    },
    achDetails: {
      status: "completed",
      traceNumber: "221475788687776",
    },
  },
  destination: {
    paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
    paymentMethodType: "moov-wallet",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    wallet: {
      walletID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
    },
  },
};

const CompletedTransferPayload = {
  transferID: "ea96962b-cf0c-4409-9ef6-ead3aa7f619a",
  createdAt: "2022-05-13T14:35:15Z",
  createdOn: "2022-05-13T14:35:15Z",
  status: "completed",
  amount: {
    currency: "USD",
    value: 200,
  },
  facilitatorFee: {
    total: 0,
  },
  source: {
    paymentMethodID: "5cc58d59-a79e-41ad-99f3-7e223ba99eaa",
    paymentMethodType: "ach-debit-fund",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    bankAccount: {
      bankAccountID: "3abc682a-1523-45fb-9776-b14c058fcccf",
      fingerprint: "c22e13fc21f8006b40eb4e6bc215a5e05eff5d98c1136a1ed60890d66bc5c056",
      status: "verified",
      holderName: "Wic Noods",
      holderType: "individual",
      bankName: "VERIDIAN CREDIT UNION",
      bankAccountType: "checking",
      routingNumber: "273976369",
      lastFourAccountNumber: "4333",
    },
    ach: {
      status: "completed",
      traceNumber: "221475788687776",
    },
    achDetails: {
      status: "completed",
      traceNumber: "221475788687776",
    },
  },
  destination: {
    paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
    paymentMethodType: "moov-wallet",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    wallet: {
      walletID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
    },
  },
};

const PendingTransferPayload = {
  transferID: "ea96962b-cf0c-4409-9ef6-ead3aa7f619a",
  createdAt: "2022-05-13T14:35:15Z",
  createdOn: "2022-05-13T14:35:15Z",
  status: "pending",
  amount: {
    currency: "USD",
    value: 300,
  },
  facilitatorFee: {
    total: 0,
  },
  source: {
    paymentMethodID: "5cc58d59-a79e-41ad-99f3-7e223ba99eaa",
    paymentMethodType: "ach-debit-fund",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    bankAccount: {
      bankAccountID: "3abc682a-1523-45fb-9776-b14c058fcccf",
      fingerprint: "c22e13fc21f8006b40eb4e6bc215a5e05eff5d98c1136a1ed60890d66bc5c056",
      status: "verified",
      holderName: "Wic Noods",
      holderType: "individual",
      bankName: "VERIDIAN CREDIT UNION",
      bankAccountType: "checking",
      routingNumber: "273976369",
      lastFourAccountNumber: "4333",
    },
    ach: {
      status: "completed",
      traceNumber: "221475788687776",
    },
    achDetails: {
      status: "completed",
      traceNumber: "221475788687776",
    },
  },
  destination: {
    paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
    paymentMethodType: "moov-wallet",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    wallet: {
      walletID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
    },
  },
};

const FailedTransferPayload = {
  transferID: "ea96962b-cf0c-4409-9ef6-ead3aa7f619a",
  createdAt: "2022-05-13T14:35:15Z",
  createdOn: "2022-05-13T14:35:15Z",
  status: "failed",
  amount: {
    currency: "USD",
    value: 300,
  },
  facilitatorFee: {
    total: 0,
  },
  source: {
    paymentMethodID: "5cc58d59-a79e-41ad-99f3-7e223ba99eaa",
    paymentMethodType: "ach-debit-fund",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    bankAccount: {
      bankAccountID: "3abc682a-1523-45fb-9776-b14c058fcccf",
      fingerprint: "c22e13fc21f8006b40eb4e6bc215a5e05eff5d98c1136a1ed60890d66bc5c056",
      status: "verified",
      holderName: "Wic Noods",
      holderType: "individual",
      bankName: "VERIDIAN CREDIT UNION",
      bankAccountType: "checking",
      routingNumber: "273976369",
      lastFourAccountNumber: "4333",
    },
    ach: {
      status: "completed",
      traceNumber: "221475788687776",
    },
    achDetails: {
      status: "completed",
      traceNumber: "221475788687776",
    },
  },
  destination: {
    paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
    paymentMethodType: "moov-wallet",
    account: {
      accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
      email: "amanda@classbooker.dev",
      displayName: "Moov Financial",
    },
    wallet: {
      walletID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
    },
  },
};

const ReversedTransactionBody = {
  eventID: "97c9b100-de50-4463-8df0-1ec8457101be",
  type: "transfer.updated",
  data: {
    accountID: "a0967848-f494-4ff4-a309-9bfcd7ecbee0",
    transferID: "89fe1277-410f-4e86-9911-4722ec3974c9",
    status: "reversed",
    source: {},
    destination: {},
  },
  createdOn: "2022-05-13T15:49:03.459915084Z",
};

const FailedTransactionBody = {
  eventID: "97c9b100-de50-4463-8df0-1ec8457101be",
  type: "transfer.updated",
  data: {
    accountID: "a0967848-f494-4ff4-a309-9bfcd7ecbee0",
    transferID: "89fe1277-410f-4e86-9911-4722ec3974c9",
    status: "failed",
    source: {},
    destination: {},
  },
  createdOn: "2022-05-13T15:49:03.459915084Z",
};

const CompletedTransactionBody = {
  eventID: "97c9b100-de50-4463-8df0-1ec8457101be",
  type: "transfer.updated",
  data: {
    accountID: "a0967848-f494-4ff4-a309-9bfcd7ecbee0",
    transferID: "89fe1277-410f-4e86-9911-4722ec3974c9",
    status: "completed",
    source: {},
    destination: {},
  },
  createdOn: "2022-05-13T15:49:03.459915084Z",
};

const CreatedTransactionBody = {
  eventID: "7d6da781-2f57-44f8-9ab0-5af69124a768",
  type: "transfer.created",
  data: {
    accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
    transferID: "71cd8493-27f5-4f59-8f9a-b7ccd04fcec2",
    status: "created",
  },
  createdOn: "2022-05-13T18:02:11.196621113Z",
};

async function SendTransaction(body: any): Promise<any> {
  await configuration.load();
  const config = configuration.active();
  const url = `http://localhost:${config.port}/webhooks`;

  const timestamp = new Date().toISOString();
  const nonce = randomUUID();
  const webhookID = randomUUID();
  const signature = generateSignature(timestamp, nonce, webhookID);

  try {
    const res: Response = await got({
      url,
      method: "POST",
      headers: {
        "x-timestamp": timestamp,
        "x-nonce": nonce,
        "x-webhook-id": webhookID,
        "x-signature": signature,
      },
      json: body,
    });
    console.log(`Response: ${res.statusCode}`);
  } catch (err) {
    console.error(`sendTransferEvent failed: ${buildGotErrorMessage(err)}`);
    process.exit(1);
  }
}

async function Test(mockMoovService: MockMoovService) {

  mockMoovService.FakeGetTranserData = async (transferID: string) => {
    let amount = randomInt(100000);
    FailedTransferPayload.amount.value = amount;
    console.log(`Generating Failed transaction of ${amount}`);
    return Promise.resolve(FailedTransferPayload);
  };

  await SendTransaction(FailedTransactionBody);

  mockMoovService.FakeGetTranserData = async (transferID: string) => {
    let amount = randomInt(100000);
    ReversedTransferPayload.amount.value = amount;
    console.log(`Generating Reversed transaction of ${amount}`);
    return Promise.resolve(ReversedTransferPayload);
  };

  await SendTransaction(ReversedTransactionBody);


  mockMoovService.FakeGetTranserData = async (transferID: string) => {
    let amount = randomInt(100000);
    PendingTransferPayload.amount.value = amount;
    console.log(`Generating Pending transaction of ${amount}`);
    return Promise.resolve(PendingTransferPayload);
  };

  mockMoovService.FakeGetTranserData = async (transferID: string) => {
    let amount = randomInt(100000);
    CompletedTransferPayload.amount.value = amount;
    console.log(`Generating Completed transaction of ${amount}`);
    return Promise.resolve(CompletedTransferPayload);
  };

  await SendTransaction(CompletedTransactionBody);

  await SendTransaction(CreatedTransactionBody);


}

(async () => {
  try {
    env["MOOV_API_URL"] = "http://local.moov.io/api";

    let mockMoovService = new MockMoovService();

    Env.MoovService = mockMoovService;

    const config = await configuration.load();

    app.start(config).catch((err) => {
      console.error("Error loading server:" + err);
    });

    await Test(mockMoovService);
  } catch (err: any) {
    if (err) {
      console.error(err.message || err);
    }
  }

 // process.exit(1);
})();
