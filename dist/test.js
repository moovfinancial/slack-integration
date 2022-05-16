"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = __importStar(require("./application"));
const configuration = __importStar(require("./configuration"));
const env_1 = require("./services/env");
const crypto_1 = require("crypto");
const got_1 = __importDefault(require("got"));
const buildGotErrorMessage_1 = __importDefault(require("./helpers/buildGotErrorMessage"));
const authentication_1 = require("./services/authentication");
const process_1 = require("process");
class MockMoovService {
    constructor() {
        this.parentService = null;
        this.FakeGetTranserData = (transferID) => {
            if (this.parentService) {
                return this.parentService.getTransferData(transferID);
            }
            return Promise.resolve(true);
        };
    }
    FakeCreateToken() {
        if (this.parentService) {
            return this.parentService.createToken();
        }
        return Promise.resolve(true);
    }
    getTransferData(transferID) {
        if (this.FakeGetTranserData != null) {
            return this.FakeGetTranserData(transferID);
        }
        return Promise.resolve(true);
    }
    createToken() {
        if (this.FakeCreateToken) {
            return this.FakeCreateToken();
        }
        return Promise.resolve({});
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
async function SendTransaction(body) {
    await configuration.load();
    const config = configuration.active();
    const url = `http://localhost:${config.port}/webhooks`;
    const timestamp = new Date().toISOString();
    const nonce = (0, crypto_1.randomUUID)();
    const webhookID = (0, crypto_1.randomUUID)();
    const signature = (0, authentication_1.generateSignature)(timestamp, nonce, webhookID);
    try {
        const res = await (0, got_1.default)({
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
    }
    catch (err) {
        console.error(`sendTransferEvent failed: ${(0, buildGotErrorMessage_1.default)(err)}`);
        process.exit(1);
    }
}
async function Test(mockMoovService) {
    mockMoovService.FakeGetTranserData = async (transferID) => {
        let amount = (0, crypto_1.randomInt)(100000);
        FailedTransferPayload.amount.value = amount;
        console.log(`Generating Failed transaction of ${amount}`);
        return Promise.resolve(FailedTransferPayload);
    };
    await SendTransaction(FailedTransactionBody);
    mockMoovService.FakeGetTranserData = async (transferID) => {
        let amount = (0, crypto_1.randomInt)(100000);
        ReversedTransferPayload.amount.value = amount;
        console.log(`Generating Reversed transaction of ${amount}`);
        return Promise.resolve(ReversedTransferPayload);
    };
    await SendTransaction(ReversedTransactionBody);
    mockMoovService.FakeGetTranserData = async (transferID) => {
        let amount = (0, crypto_1.randomInt)(100000);
        PendingTransferPayload.amount.value = amount;
        console.log(`Generating Pending transaction of ${amount}`);
        return Promise.resolve(PendingTransferPayload);
    };
    mockMoovService.FakeGetTranserData = async (transferID) => {
        let amount = (0, crypto_1.randomInt)(100000);
        CompletedTransferPayload.amount.value = amount;
        console.log(`Generating Completed transaction of ${amount}`);
        return Promise.resolve(CompletedTransferPayload);
    };
    await SendTransaction(CompletedTransactionBody);
    await SendTransaction(CreatedTransactionBody);
}
(async () => {
    try {
        process_1.env["MOOV_API_URL"] = "http://local.moov.io/api";
        let mockMoovService = new MockMoovService();
        env_1.Env.MoovService = mockMoovService;
        const config = await configuration.load();
        app.start(config).catch((err) => {
            console.error("Error loading server:" + err);
        });
        await Test(mockMoovService);
    }
    catch (err) {
        if (err) {
            console.error(err.message || err);
        }
    }
    // process.exit(1);
})();
