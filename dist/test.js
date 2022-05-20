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
const moov_1 = require("./services/moov");
const crypto_1 = require("crypto");
const got_1 = __importDefault(require("got"));
const buildGotErrorMessage_1 = __importDefault(require("./helpers/buildGotErrorMessage"));
const authentication_1 = require("./services/authentication");
const process_1 = require("process");
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
const CompletedTransferPayloadBank2Wallet = {
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
const CompletedTransferPayloadBank2Card = {
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
        paymentMethodType: "card",
        account: {
            accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
            email: "amanda@classbooker.dev",
            displayName: "Moov Financial",
        },
        card: {
            cardID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
        },
    },
};
const CompletedTransferPayloadBank2Bank = {
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
};
const CompletedTransferPayloadCard2Wallet = {
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
        paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
        paymentMethodType: "card",
        account: {
            accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
            email: "amanda@classbooker.dev",
            displayName: "Moov Financial",
        },
        card: {
            cardID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
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
const CompletedTransferPayloadCard2Card = {
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
        paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
        paymentMethodType: "card",
        account: {
            accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
            email: "amanda@classbooker.dev",
            displayName: "Moov Financial",
        },
        card: {
            cardID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
        },
    },
    destination: {
        paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
        paymentMethodType: "card",
        account: {
            accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
            email: "amanda@classbooker.dev",
            displayName: "Moov Financial",
        },
        card: {
            cardID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
        },
    },
};
const CompletedTransferPayloadCard2Bank = {
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
        paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
        paymentMethodType: "card",
        account: {
            accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
            email: "amanda@classbooker.dev",
            displayName: "Moov Financial",
        },
        card: {
            cardID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
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
};
const CompletedTransferPayloadWallet2Wallet = {
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
const CompletedTransferPayloadWallet2Card = {
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
    destination: {
        paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
        paymentMethodType: "card",
        account: {
            accountID: "d4496693-cc50-466e-ab07-3974bfe7f4ac",
            email: "amanda@classbooker.dev",
            displayName: "Moov Financial",
        },
        card: {
            cardID: "35bce66e-c8f2-48ed-8fd0-c02bfd55e71a",
        },
    },
};
const CompletedTransferPayloadWallet2Bank = {
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
    destination: {
        paymentMethodID: "ce0a27e7-5735-4432-a9c9-09c4d2082411",
        paymentMethodType: "moov-wallet",
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
let payloads = {
    "e07bd82e-875b-4122-9374-4a03860da8ca": ReversedTransferPayload,
    "e07bd82e-875b-4122-9374-4a03860da8cb": CompletedTransferPayload,
    "e07bd82e-875b-4122-9374-4a03860da8cc": CompletedTransferPayloadBank2Bank,
    "e07bd82e-875b-4122-9374-4a03860da8cd": CompletedTransferPayloadBank2Card,
    "e07bd82e-875b-4122-9374-4a03860da8ce": CompletedTransferPayloadBank2Wallet,
    "e07bd82e-875b-4122-9374-4a03860da8cf": CompletedTransferPayloadCard2Bank,
    "e07bd82e-875b-4122-9374-4a03860da8cg": CompletedTransferPayloadCard2Card,
    "e07bd82e-875b-4122-9374-4a03860da8ch": CompletedTransferPayloadCard2Wallet,
    "e07bd82e-875b-4122-9374-4a03860da8ci": CompletedTransferPayloadWallet2Bank,
    "e07bd82e-875b-4122-9374-4a03860da8cj": CompletedTransferPayloadWallet2Card,
    "e07bd82e-875b-4122-9374-4a03860da8ck": CompletedTransferPayloadWallet2Wallet,
    "e07bd82e-875b-4122-9374-4a03860da8cl": CompletedTransferPayloadBank2Wallet,
    "e07bd82e-875b-4122-9374-4a03860da8cm": PendingTransferPayload,
    "e07bd82e-875b-4122-9374-4a03860da8cn": FailedTransferPayload,
};
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
        if (this.parentService) {
            return this.parentService.getTransferData(transferID);
        }
        return Promise.resolve(true);
    }
    createToken() {
        if (this.FakeCreateToken) {
            return this.FakeCreateToken();
        }
        if (this.parentService) {
            return this.parentService.createToken();
        }
        return Promise.resolve({});
    }
}
async function SendTransaction(body) {
    console.log(body);
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
    for (let id in payloads) {
        let nbody = JSON.parse(JSON.stringify(CreatedTransactionBody));
        nbody.data.transferID = id;
        await SendTransaction(nbody);
    }
    // mockMoovService.FakeGetTranserData = async (transferID: string) => {
    //   let amount = randomInt(100000);
    //   FailedTransferPayload.amount.value = amount;
    //   console.log(`Generating Failed transaction of ${amount}`);
    //   return Promise.resolve(FailedTransferPayload);
    // };
    await SendTransaction(FailedTransactionBody);
    // mockMoovService.FakeGetTranserData = async (transferID: string) => {
    //   let amount = randomInt(100000);
    //   ReversedTransferPayload.amount.value = amount;
    //   console.log(`Generating Reversed transaction of ${amount}`);
    //   return Promise.resolve(ReversedTransferPayload);
    // };
    await SendTransaction(ReversedTransactionBody);
    // mockMoovService.FakeGetTranserData = async (transferID: string) => {
    //   let amount = randomInt(100000);
    //   PendingTransferPayload.amount.value = amount;
    //   console.log(`Generating Pending transaction of ${amount}`);
    //   return Promise.resolve(PendingTransferPayload);
    // };
    // mockMoovService.FakeGetTranserData = async (transferID: string) => {
    //   let amount = randomInt(100000);
    //   CompletedTransferPayload.amount.value = amount;
    //   console.log(`Generating Completed transaction of ${amount}`);
    //   return Promise.resolve(CompletedTransferPayload);
    // };
    await SendTransaction(CompletedTransactionBody);
    await SendTransaction(CreatedTransactionBody);
}
(async () => {
    try {
        process_1.env["MOOV_API_URL"] = "http://local.moov.io/api";
        let mockMoovService = new MockMoovService();
        mockMoovService.parentService = new moov_1.MoovService();
        mockMoovService.FakeGetTranserData = async (transferID) => {
            console.log(transferID);
            let body = payloads[transferID];
            let amount = (0, crypto_1.randomInt)(100000);
            body.amount.value = amount;
            body.transferID = transferID;
            return body;
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxQztBQUNyQywrREFBaUQ7QUFDakQsd0NBQXFDO0FBQ3JDLDBDQUF1RTtBQUN2RSxtQ0FBcUQ7QUFDckQsOENBQW9DO0FBQ3BDLDBGQUFrRTtBQUNsRSw4REFBOEQ7QUFDOUQscUNBQThCO0FBSTlCLE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIsVUFBVSxFQUFFLHNDQUFzQztJQUNsRCxTQUFTLEVBQUUsc0JBQXNCO0lBQ2pDLFNBQVMsRUFBRSxzQkFBc0I7SUFDakMsTUFBTSxFQUFFLFVBQVU7SUFDbEIsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELE1BQU0sRUFBRTtRQUNOLGVBQWUsRUFBRSxzQ0FBc0M7UUFDdkQsaUJBQWlCLEVBQUUsZ0JBQWdCO1FBQ25DLE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSxzQ0FBc0M7WUFDakQsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixXQUFXLEVBQUUsZ0JBQWdCO1NBQzlCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsYUFBYSxFQUFFLHNDQUFzQztZQUNyRCxXQUFXLEVBQUUsa0VBQWtFO1lBQy9FLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsZUFBZSxFQUFFLFVBQVU7WUFDM0IsYUFBYSxFQUFFLFdBQVc7WUFDMUIscUJBQXFCLEVBQUUsTUFBTTtTQUM5QjtRQUNELEdBQUcsRUFBRTtZQUNILE1BQU0sRUFBRSxXQUFXO1lBQ25CLFdBQVcsRUFBRSxpQkFBaUI7U0FDL0I7UUFDRCxVQUFVLEVBQUU7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QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDL0IsSUFBSSxNQUFNLEdBQUcsSUFBQSxrQkFBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixPQUFPLElBQUksQ0FBQTtRQUViLENBQUMsQ0FBQztRQUVGLFNBQUcsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBRWxDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQzdCO0lBQUMsT0FBTyxHQUFRLEVBQUU7UUFDakIsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLENBQUM7U0FDbkM7S0FDRjtJQUVELG1CQUFtQjtBQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYXBwIGZyb20gXCIuL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBjb25maWd1cmF0aW9uIGZyb20gXCIuL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IEVudiB9IGZyb20gXCIuL3NlcnZpY2VzL2VudlwiO1xuaW1wb3J0IHsgTW9vdlNlcnZpY2UsIElNb292U2VydmljZSwgTW9vdlRva2VuIH0gZnJvbSBcIi4vc2VydmljZXMvbW9vdlwiO1xuaW1wb3J0IHsgcmFuZG9tSW50LCByYW5kb21VVUlELCBzaWduIH0gZnJvbSBcImNyeXB0b1wiO1xuaW1wb3J0IGdvdCwgeyBSZXNwb25zZSB9IGZyb20gXCJnb3RcIjtcbmltcG9ydCBidWlsZEdvdEVycm9yTWVzc2FnZSBmcm9tIFwiLi9oZWxwZXJzL2J1aWxkR290RXJyb3JNZXNzYWdlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVNpZ25hdHVyZSB9IGZyb20gXCIuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uXCI7XG5pbXBvcnQgeyBlbnYgfSBmcm9tIFwicHJvY2Vzc1wiO1xuXG5cblxuY29uc3QgUmV2ZXJzZWRUcmFuc2ZlclBheWxvYWQgPSB7XG4gIHRyYW5zZmVySUQ6IFwiZWE5Njk2MmItY2YwYy00NDA5LTllZjYtZWFkM2FhN2Y2MTlhXCIsXG4gIGNyZWF0ZWRBdDogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgc3RhdHVzOiBcInJldmVyc2VkXCIsXG4gIGFtb3VudDoge1xuICAgIGN1cnJlbmN5OiBcIlVTRFwiLFxuICAgIHZhbHVlOiAxMDAsXG4gIH0sXG4gIGZhY2lsaXRhdG9yRmVlOiB7XG4gICAgdG90YWw6IDAsXG4gIH0sXG4gIHNvdXJjZToge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCI1Y2M1OGQ1OS1hNzllLTQxYWQtOTlmMy03ZTIyM2JhOTllYWFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJhY2gtZGViaXQtZnVuZFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICBiYW5rQWNjb3VudDoge1xuICAgICAgYmFua0FjY291bnRJRDogXCIzYWJjNjgyYS0xNTIzLTQ1ZmItOTc3Ni1iMTRjMDU4ZmNjY2ZcIixcbiAgICAgIGZpbmdlcnByaW50OiBcImMyMmUxM2ZjMjFmODAwNmI0MGViNGU2YmMyMTVhNWUwNWVmZjVkOThjMTEzNmExZWQ2MDg5MGQ2NmJjNWMwNTZcIixcbiAgICAgIHN0YXR1czogXCJ2ZXJpZmllZFwiLFxuICAgICAgaG9sZGVyTmFtZTogXCJXaWMgTm9vZHNcIixcbiAgICAgIGhvbGRlclR5cGU6IFwiaW5kaXZpZHVhbFwiLFxuICAgICAgYmFua05hbWU6IFwiVkVSSURJQU4gQ1JFRElUIFVOSU9OXCIsXG4gICAgICBiYW5rQWNjb3VudFR5cGU6IFwiY2hlY2tpbmdcIixcbiAgICAgIHJvdXRpbmdOdW1iZXI6IFwiMjczOTc2MzY5XCIsXG4gICAgICBsYXN0Rm91ckFjY291bnROdW1iZXI6IFwiNDMzM1wiLFxuICAgIH0sXG4gICAgYWNoOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICAgIGFjaERldGFpbHM6IHtcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICAgIHRyYWNlTnVtYmVyOiBcIjIyMTQ3NTc4ODY4Nzc3NlwiLFxuICAgIH0sXG4gIH0sXG4gIGRlc3RpbmF0aW9uOiB7XG4gICAgcGF5bWVudE1ldGhvZElEOiBcImNlMGEyN2U3LTU3MzUtNDQzMi1hOWM5LTA5YzRkMjA4MjQxMVwiLFxuICAgIHBheW1lbnRNZXRob2RUeXBlOiBcIm1vb3Ytd2FsbGV0XCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIHdhbGxldDoge1xuICAgICAgd2FsbGV0SUQ6IFwiMzViY2U2NmUtYzhmMi00OGVkLThmZDAtYzAyYmZkNTVlNzFhXCIsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IENvbXBsZXRlZFRyYW5zZmVyUGF5bG9hZCA9IHtcbiAgdHJhbnNmZXJJRDogXCJlYTk2OTYyYi1jZjBjLTQ0MDktOWVmNi1lYWQzYWE3ZjYxOWFcIixcbiAgY3JlYXRlZEF0OiBcIjIwMjItMDUtMTNUMTQ6MzU6MTVaXCIsXG4gIGNyZWF0ZWRPbjogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gIGFtb3VudDoge1xuICAgIGN1cnJlbmN5OiBcIlVTRFwiLFxuICAgIHZhbHVlOiAyMDAsXG4gIH0sXG4gIGZhY2lsaXRhdG9yRmVlOiB7XG4gICAgdG90YWw6IDAsXG4gIH0sXG4gIHNvdXJjZToge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCI1Y2M1OGQ1OS1hNzllLTQxYWQtOTlmMy03ZTIyM2JhOTllYWFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJhY2gtZGViaXQtZnVuZFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICBiYW5rQWNjb3VudDoge1xuICAgICAgYmFua0FjY291bnRJRDogXCIzYWJjNjgyYS0xNTIzLTQ1ZmItOTc3Ni1iMTRjMDU4ZmNjY2ZcIixcbiAgICAgIGZpbmdlcnByaW50OiBcImMyMmUxM2ZjMjFmODAwNmI0MGViNGU2YmMyMTVhNWUwNWVmZjVkOThjMTEzNmExZWQ2MDg5MGQ2NmJjNWMwNTZcIixcbiAgICAgIHN0YXR1czogXCJ2ZXJpZmllZFwiLFxuICAgICAgaG9sZGVyTmFtZTogXCJXaWMgTm9vZHNcIixcbiAgICAgIGhvbGRlclR5cGU6IFwiaW5kaXZpZHVhbFwiLFxuICAgICAgYmFua05hbWU6IFwiVkVSSURJQU4gQ1JFRElUIFVOSU9OXCIsXG4gICAgICBiYW5rQWNjb3VudFR5cGU6IFwiY2hlY2tpbmdcIixcbiAgICAgIHJvdXRpbmdOdW1iZXI6IFwiMjczOTc2MzY5XCIsXG4gICAgICBsYXN0Rm91ckFjY291bnROdW1iZXI6IFwiNDMzM1wiLFxuICAgIH0sXG4gICAgYWNoOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICAgIGFjaERldGFpbHM6IHtcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICAgIHRyYWNlTnVtYmVyOiBcIjIyMTQ3NTc4ODY4Nzc3NlwiLFxuICAgIH0sXG4gIH0sXG4gIGRlc3RpbmF0aW9uOiB7XG4gICAgcGF5bWVudE1ldGhvZElEOiBcImNlMGEyN2U3LTU3MzUtNDQzMi1hOWM5LTA5YzRkMjA4MjQxMVwiLFxuICAgIHBheW1lbnRNZXRob2RUeXBlOiBcIm1vb3Ytd2FsbGV0XCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIHdhbGxldDoge1xuICAgICAgd2FsbGV0SUQ6IFwiMzViY2U2NmUtYzhmMi00OGVkLThmZDAtYzAyYmZkNTVlNzFhXCIsXG4gICAgfSxcbiAgfSxcbn07XG5cblxuY29uc3QgQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkQmFuazJXYWxsZXQgPSB7XG4gIHRyYW5zZmVySUQ6IFwiZWE5Njk2MmItY2YwYy00NDA5LTllZjYtZWFkM2FhN2Y2MTlhXCIsXG4gIGNyZWF0ZWRBdDogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICBhbW91bnQ6IHtcbiAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICB2YWx1ZTogMjAwLFxuICB9LFxuICBmYWNpbGl0YXRvckZlZToge1xuICAgIHRvdGFsOiAwLFxuICB9LFxuICBzb3VyY2U6IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiNWNjNThkNTktYTc5ZS00MWFkLTk5ZjMtN2UyMjNiYTk5ZWFhXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwiYWNoLWRlYml0LWZ1bmRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgYmFua0FjY291bnQ6IHtcbiAgICAgIGJhbmtBY2NvdW50SUQ6IFwiM2FiYzY4MmEtMTUyMy00NWZiLTk3NzYtYjE0YzA1OGZjY2NmXCIsXG4gICAgICBmaW5nZXJwcmludDogXCJjMjJlMTNmYzIxZjgwMDZiNDBlYjRlNmJjMjE1YTVlMDVlZmY1ZDk4YzExMzZhMWVkNjA4OTBkNjZiYzVjMDU2XCIsXG4gICAgICBzdGF0dXM6IFwidmVyaWZpZWRcIixcbiAgICAgIGhvbGRlck5hbWU6IFwiV2ljIE5vb2RzXCIsXG4gICAgICBob2xkZXJUeXBlOiBcImluZGl2aWR1YWxcIixcbiAgICAgIGJhbmtOYW1lOiBcIlZFUklESUFOIENSRURJVCBVTklPTlwiLFxuICAgICAgYmFua0FjY291bnRUeXBlOiBcImNoZWNraW5nXCIsXG4gICAgICByb3V0aW5nTnVtYmVyOiBcIjI3Mzk3NjM2OVwiLFxuICAgICAgbGFzdEZvdXJBY2NvdW50TnVtYmVyOiBcIjQzMzNcIixcbiAgICB9LFxuICAgIGFjaDoge1xuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgdHJhY2VOdW1iZXI6IFwiMjIxNDc1Nzg4Njg3Nzc2XCIsXG4gICAgfSxcbiAgICBhY2hEZXRhaWxzOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJtb292LXdhbGxldFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICB3YWxsZXQ6IHtcbiAgICAgIHdhbGxldElEOiBcIjM1YmNlNjZlLWM4ZjItNDhlZC04ZmQwLWMwMmJmZDU1ZTcxYVwiLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRCYW5rMkNhcmQgPSB7XG4gIHRyYW5zZmVySUQ6IFwiZWE5Njk2MmItY2YwYy00NDA5LTllZjYtZWFkM2FhN2Y2MTlhXCIsXG4gIGNyZWF0ZWRBdDogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICBhbW91bnQ6IHtcbiAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICB2YWx1ZTogMjAwLFxuICB9LFxuICBmYWNpbGl0YXRvckZlZToge1xuICAgIHRvdGFsOiAwLFxuICB9LFxuICBzb3VyY2U6IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiNWNjNThkNTktYTc5ZS00MWFkLTk5ZjMtN2UyMjNiYTk5ZWFhXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwiYWNoLWRlYml0LWZ1bmRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgYmFua0FjY291bnQ6IHtcbiAgICAgIGJhbmtBY2NvdW50SUQ6IFwiM2FiYzY4MmEtMTUyMy00NWZiLTk3NzYtYjE0YzA1OGZjY2NmXCIsXG4gICAgICBmaW5nZXJwcmludDogXCJjMjJlMTNmYzIxZjgwMDZiNDBlYjRlNmJjMjE1YTVlMDVlZmY1ZDk4YzExMzZhMWVkNjA4OTBkNjZiYzVjMDU2XCIsXG4gICAgICBzdGF0dXM6IFwidmVyaWZpZWRcIixcbiAgICAgIGhvbGRlck5hbWU6IFwiV2ljIE5vb2RzXCIsXG4gICAgICBob2xkZXJUeXBlOiBcImluZGl2aWR1YWxcIixcbiAgICAgIGJhbmtOYW1lOiBcIlZFUklESUFOIENSRURJVCBVTklPTlwiLFxuICAgICAgYmFua0FjY291bnRUeXBlOiBcImNoZWNraW5nXCIsXG4gICAgICByb3V0aW5nTnVtYmVyOiBcIjI3Mzk3NjM2OVwiLFxuICAgICAgbGFzdEZvdXJBY2NvdW50TnVtYmVyOiBcIjQzMzNcIixcbiAgICB9LFxuICAgIGFjaDoge1xuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgdHJhY2VOdW1iZXI6IFwiMjIxNDc1Nzg4Njg3Nzc2XCIsXG4gICAgfSxcbiAgICBhY2hEZXRhaWxzOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJjYXJkXCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIGNhcmQ6IHtcbiAgICAgIGNhcmRJRDogXCIzNWJjZTY2ZS1jOGYyLTQ4ZWQtOGZkMC1jMDJiZmQ1NWU3MWFcIixcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkQmFuazJCYW5rID0ge1xuICB0cmFuc2ZlcklEOiBcImVhOTY5NjJiLWNmMGMtNDQwOS05ZWY2LWVhZDNhYTdmNjE5YVwiLFxuICBjcmVhdGVkQXQ6IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgY3JlYXRlZE9uOiBcIjIwMjItMDUtMTNUMTQ6MzU6MTVaXCIsXG4gIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgYW1vdW50OiB7XG4gICAgY3VycmVuY3k6IFwiVVNEXCIsXG4gICAgdmFsdWU6IDIwMCxcbiAgfSxcbiAgZmFjaWxpdGF0b3JGZWU6IHtcbiAgICB0b3RhbDogMCxcbiAgfSxcbiAgc291cmNlOiB7XG4gICAgcGF5bWVudE1ldGhvZElEOiBcIjVjYzU4ZDU5LWE3OWUtNDFhZC05OWYzLTdlMjIzYmE5OWVhYVwiLFxuICAgIHBheW1lbnRNZXRob2RUeXBlOiBcImFjaC1kZWJpdC1mdW5kXCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIGJhbmtBY2NvdW50OiB7XG4gICAgICBiYW5rQWNjb3VudElEOiBcIjNhYmM2ODJhLTE1MjMtNDVmYi05Nzc2LWIxNGMwNThmY2NjZlwiLFxuICAgICAgZmluZ2VycHJpbnQ6IFwiYzIyZTEzZmMyMWY4MDA2YjQwZWI0ZTZiYzIxNWE1ZTA1ZWZmNWQ5OGMxMTM2YTFlZDYwODkwZDY2YmM1YzA1NlwiLFxuICAgICAgc3RhdHVzOiBcInZlcmlmaWVkXCIsXG4gICAgICBob2xkZXJOYW1lOiBcIldpYyBOb29kc1wiLFxuICAgICAgaG9sZGVyVHlwZTogXCJpbmRpdmlkdWFsXCIsXG4gICAgICBiYW5rTmFtZTogXCJWRVJJRElBTiBDUkVESVQgVU5JT05cIixcbiAgICAgIGJhbmtBY2NvdW50VHlwZTogXCJjaGVja2luZ1wiLFxuICAgICAgcm91dGluZ051bWJlcjogXCIyNzM5NzYzNjlcIixcbiAgICAgIGxhc3RGb3VyQWNjb3VudE51bWJlcjogXCI0MzMzXCIsXG4gICAgfSxcbiAgICBhY2g6IHtcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICAgIHRyYWNlTnVtYmVyOiBcIjIyMTQ3NTc4ODY4Nzc3NlwiLFxuICAgIH0sXG4gICAgYWNoRGV0YWlsczoge1xuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgdHJhY2VOdW1iZXI6IFwiMjIxNDc1Nzg4Njg3Nzc2XCIsXG4gICAgfSxcbiAgfSxcbiAgZGVzdGluYXRpb246IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiY2UwYTI3ZTctNTczNS00NDMyLWE5YzktMDljNGQyMDgyNDExXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwibW9vdi13YWxsZXRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgYmFua0FjY291bnQ6IHtcbiAgICAgIGJhbmtBY2NvdW50SUQ6IFwiM2FiYzY4MmEtMTUyMy00NWZiLTk3NzYtYjE0YzA1OGZjY2NmXCIsXG4gICAgICBmaW5nZXJwcmludDogXCJjMjJlMTNmYzIxZjgwMDZiNDBlYjRlNmJjMjE1YTVlMDVlZmY1ZDk4YzExMzZhMWVkNjA4OTBkNjZiYzVjMDU2XCIsXG4gICAgICBzdGF0dXM6IFwidmVyaWZpZWRcIixcbiAgICAgIGhvbGRlck5hbWU6IFwiV2ljIE5vb2RzXCIsXG4gICAgICBob2xkZXJUeXBlOiBcImluZGl2aWR1YWxcIixcbiAgICAgIGJhbmtOYW1lOiBcIlZFUklESUFOIENSRURJVCBVTklPTlwiLFxuICAgICAgYmFua0FjY291bnRUeXBlOiBcImNoZWNraW5nXCIsXG4gICAgICByb3V0aW5nTnVtYmVyOiBcIjI3Mzk3NjM2OVwiLFxuICAgICAgbGFzdEZvdXJBY2NvdW50TnVtYmVyOiBcIjQzMzNcIixcbiAgICB9LFxuICAgIGFjaDoge1xuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgdHJhY2VOdW1iZXI6IFwiMjIxNDc1Nzg4Njg3Nzc2XCIsXG4gICAgfSxcbiAgICBhY2hEZXRhaWxzOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICB9LFxufTtcblxuXG5jb25zdCBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRDYXJkMldhbGxldCA9IHtcbiAgdHJhbnNmZXJJRDogXCJlYTk2OTYyYi1jZjBjLTQ0MDktOWVmNi1lYWQzYWE3ZjYxOWFcIixcbiAgY3JlYXRlZEF0OiBcIjIwMjItMDUtMTNUMTQ6MzU6MTVaXCIsXG4gIGNyZWF0ZWRPbjogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gIGFtb3VudDoge1xuICAgIGN1cnJlbmN5OiBcIlVTRFwiLFxuICAgIHZhbHVlOiAyMDAsXG4gIH0sXG4gIGZhY2lsaXRhdG9yRmVlOiB7XG4gICAgdG90YWw6IDAsXG4gIH0sXG4gIHNvdXJjZToge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJjYXJkXCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIGNhcmQ6IHtcbiAgICAgIGNhcmRJRDogXCIzNWJjZTY2ZS1jOGYyLTQ4ZWQtOGZkMC1jMDJiZmQ1NWU3MWFcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJtb292LXdhbGxldFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICB3YWxsZXQ6IHtcbiAgICAgIHdhbGxldElEOiBcIjM1YmNlNjZlLWM4ZjItNDhlZC04ZmQwLWMwMmJmZDU1ZTcxYVwiLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRDYXJkMkNhcmQgPSB7XG4gIHRyYW5zZmVySUQ6IFwiZWE5Njk2MmItY2YwYy00NDA5LTllZjYtZWFkM2FhN2Y2MTlhXCIsXG4gIGNyZWF0ZWRBdDogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICBhbW91bnQ6IHtcbiAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICB2YWx1ZTogMjAwLFxuICB9LFxuICBmYWNpbGl0YXRvckZlZToge1xuICAgIHRvdGFsOiAwLFxuICB9LFxuICBzb3VyY2U6IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiY2UwYTI3ZTctNTczNS00NDMyLWE5YzktMDljNGQyMDgyNDExXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwiY2FyZFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICBjYXJkOiB7XG4gICAgICBjYXJkSUQ6IFwiMzViY2U2NmUtYzhmMi00OGVkLThmZDAtYzAyYmZkNTVlNzFhXCIsXG4gICAgfSxcbiAgfSxcbiAgZGVzdGluYXRpb246IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiY2UwYTI3ZTctNTczNS00NDMyLWE5YzktMDljNGQyMDgyNDExXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwiY2FyZFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICBjYXJkOiB7XG4gICAgICBjYXJkSUQ6IFwiMzViY2U2NmUtYzhmMi00OGVkLThmZDAtYzAyYmZkNTVlNzFhXCIsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IENvbXBsZXRlZFRyYW5zZmVyUGF5bG9hZENhcmQyQmFuayA9IHtcbiAgdHJhbnNmZXJJRDogXCJlYTk2OTYyYi1jZjBjLTQ0MDktOWVmNi1lYWQzYWE3ZjYxOWFcIixcbiAgY3JlYXRlZEF0OiBcIjIwMjItMDUtMTNUMTQ6MzU6MTVaXCIsXG4gIGNyZWF0ZWRPbjogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gIGFtb3VudDoge1xuICAgIGN1cnJlbmN5OiBcIlVTRFwiLFxuICAgIHZhbHVlOiAyMDAsXG4gIH0sXG4gIGZhY2lsaXRhdG9yRmVlOiB7XG4gICAgdG90YWw6IDAsXG4gIH0sXG4gIHNvdXJjZToge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJjYXJkXCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIGNhcmQ6IHtcbiAgICAgIGNhcmRJRDogXCIzNWJjZTY2ZS1jOGYyLTQ4ZWQtOGZkMC1jMDJiZmQ1NWU3MWFcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJtb292LXdhbGxldFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICBiYW5rQWNjb3VudDoge1xuICAgICAgYmFua0FjY291bnRJRDogXCIzYWJjNjgyYS0xNTIzLTQ1ZmItOTc3Ni1iMTRjMDU4ZmNjY2ZcIixcbiAgICAgIGZpbmdlcnByaW50OiBcImMyMmUxM2ZjMjFmODAwNmI0MGViNGU2YmMyMTVhNWUwNWVmZjVkOThjMTEzNmExZWQ2MDg5MGQ2NmJjNWMwNTZcIixcbiAgICAgIHN0YXR1czogXCJ2ZXJpZmllZFwiLFxuICAgICAgaG9sZGVyTmFtZTogXCJXaWMgTm9vZHNcIixcbiAgICAgIGhvbGRlclR5cGU6IFwiaW5kaXZpZHVhbFwiLFxuICAgICAgYmFua05hbWU6IFwiVkVSSURJQU4gQ1JFRElUIFVOSU9OXCIsXG4gICAgICBiYW5rQWNjb3VudFR5cGU6IFwiY2hlY2tpbmdcIixcbiAgICAgIHJvdXRpbmdOdW1iZXI6IFwiMjczOTc2MzY5XCIsXG4gICAgICBsYXN0Rm91ckFjY291bnROdW1iZXI6IFwiNDMzM1wiLFxuICAgIH0sXG4gICAgYWNoOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICAgIGFjaERldGFpbHM6IHtcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICAgIHRyYWNlTnVtYmVyOiBcIjIyMTQ3NTc4ODY4Nzc3NlwiLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRXYWxsZXQyV2FsbGV0ID0ge1xuICB0cmFuc2ZlcklEOiBcImVhOTY5NjJiLWNmMGMtNDQwOS05ZWY2LWVhZDNhYTdmNjE5YVwiLFxuICBjcmVhdGVkQXQ6IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgY3JlYXRlZE9uOiBcIjIwMjItMDUtMTNUMTQ6MzU6MTVaXCIsXG4gIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgYW1vdW50OiB7XG4gICAgY3VycmVuY3k6IFwiVVNEXCIsXG4gICAgdmFsdWU6IDIwMCxcbiAgfSxcbiAgZmFjaWxpdGF0b3JGZWU6IHtcbiAgICB0b3RhbDogMCxcbiAgfSxcbiAgc291cmNlOiB7XG4gICAgcGF5bWVudE1ldGhvZElEOiBcImNlMGEyN2U3LTU3MzUtNDQzMi1hOWM5LTA5YzRkMjA4MjQxMVwiLFxuICAgIHBheW1lbnRNZXRob2RUeXBlOiBcIm1vb3Ytd2FsbGV0XCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIHdhbGxldDoge1xuICAgICAgd2FsbGV0SUQ6IFwiMzViY2U2NmUtYzhmMi00OGVkLThmZDAtYzAyYmZkNTVlNzFhXCIsXG4gICAgfSxcbiAgfSxcbiAgZGVzdGluYXRpb246IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiY2UwYTI3ZTctNTczNS00NDMyLWE5YzktMDljNGQyMDgyNDExXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwibW9vdi13YWxsZXRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgd2FsbGV0OiB7XG4gICAgICB3YWxsZXRJRDogXCIzNWJjZTY2ZS1jOGYyLTQ4ZWQtOGZkMC1jMDJiZmQ1NWU3MWFcIixcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkV2FsbGV0MkNhcmQgPSB7XG4gIHRyYW5zZmVySUQ6IFwiZWE5Njk2MmItY2YwYy00NDA5LTllZjYtZWFkM2FhN2Y2MTlhXCIsXG4gIGNyZWF0ZWRBdDogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICBhbW91bnQ6IHtcbiAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICB2YWx1ZTogMjAwLFxuICB9LFxuICBmYWNpbGl0YXRvckZlZToge1xuICAgIHRvdGFsOiAwLFxuICB9LFxuICBzb3VyY2U6IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiY2UwYTI3ZTctNTczNS00NDMyLWE5YzktMDljNGQyMDgyNDExXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwibW9vdi13YWxsZXRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgd2FsbGV0OiB7XG4gICAgICB3YWxsZXRJRDogXCIzNWJjZTY2ZS1jOGYyLTQ4ZWQtOGZkMC1jMDJiZmQ1NWU3MWFcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJjYXJkXCIsXG4gICAgYWNjb3VudDoge1xuICAgICAgYWNjb3VudElEOiBcImQ0NDk2NjkzLWNjNTAtNDY2ZS1hYjA3LTM5NzRiZmU3ZjRhY1wiLFxuICAgICAgZW1haWw6IFwiYW1hbmRhQGNsYXNzYm9va2VyLmRldlwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9vdiBGaW5hbmNpYWxcIixcbiAgICB9LFxuICAgIGNhcmQ6IHtcbiAgICAgIGNhcmRJRDogXCIzNWJjZTY2ZS1jOGYyLTQ4ZWQtOGZkMC1jMDJiZmQ1NWU3MWFcIixcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkV2FsbGV0MkJhbmsgPSB7XG4gIHRyYW5zZmVySUQ6IFwiZWE5Njk2MmItY2YwYy00NDA5LTllZjYtZWFkM2FhN2Y2MTlhXCIsXG4gIGNyZWF0ZWRBdDogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICBhbW91bnQ6IHtcbiAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICB2YWx1ZTogMjAwLFxuICB9LFxuICBmYWNpbGl0YXRvckZlZToge1xuICAgIHRvdGFsOiAwLFxuICB9LFxuICBzb3VyY2U6IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiY2UwYTI3ZTctNTczNS00NDMyLWE5YzktMDljNGQyMDgyNDExXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwibW9vdi13YWxsZXRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgd2FsbGV0OiB7XG4gICAgICB3YWxsZXRJRDogXCIzNWJjZTY2ZS1jOGYyLTQ4ZWQtOGZkMC1jMDJiZmQ1NWU3MWFcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJtb292LXdhbGxldFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICBiYW5rQWNjb3VudDoge1xuICAgICAgYmFua0FjY291bnRJRDogXCIzYWJjNjgyYS0xNTIzLTQ1ZmItOTc3Ni1iMTRjMDU4ZmNjY2ZcIixcbiAgICAgIGZpbmdlcnByaW50OiBcImMyMmUxM2ZjMjFmODAwNmI0MGViNGU2YmMyMTVhNWUwNWVmZjVkOThjMTEzNmExZWQ2MDg5MGQ2NmJjNWMwNTZcIixcbiAgICAgIHN0YXR1czogXCJ2ZXJpZmllZFwiLFxuICAgICAgaG9sZGVyTmFtZTogXCJXaWMgTm9vZHNcIixcbiAgICAgIGhvbGRlclR5cGU6IFwiaW5kaXZpZHVhbFwiLFxuICAgICAgYmFua05hbWU6IFwiVkVSSURJQU4gQ1JFRElUIFVOSU9OXCIsXG4gICAgICBiYW5rQWNjb3VudFR5cGU6IFwiY2hlY2tpbmdcIixcbiAgICAgIHJvdXRpbmdOdW1iZXI6IFwiMjczOTc2MzY5XCIsXG4gICAgICBsYXN0Rm91ckFjY291bnROdW1iZXI6IFwiNDMzM1wiLFxuICAgIH0sXG4gICAgYWNoOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICAgIGFjaERldGFpbHM6IHtcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICAgIHRyYWNlTnVtYmVyOiBcIjIyMTQ3NTc4ODY4Nzc3NlwiLFxuICAgIH0sXG4gIH0sXG59O1xuXG5cblxuY29uc3QgUGVuZGluZ1RyYW5zZmVyUGF5bG9hZCA9IHtcbiAgdHJhbnNmZXJJRDogXCJlYTk2OTYyYi1jZjBjLTQ0MDktOWVmNi1lYWQzYWE3ZjYxOWFcIixcbiAgY3JlYXRlZEF0OiBcIjIwMjItMDUtMTNUMTQ6MzU6MTVaXCIsXG4gIGNyZWF0ZWRPbjogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBzdGF0dXM6IFwicGVuZGluZ1wiLFxuICBhbW91bnQ6IHtcbiAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICB2YWx1ZTogMzAwLFxuICB9LFxuICBmYWNpbGl0YXRvckZlZToge1xuICAgIHRvdGFsOiAwLFxuICB9LFxuICBzb3VyY2U6IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiNWNjNThkNTktYTc5ZS00MWFkLTk5ZjMtN2UyMjNiYTk5ZWFhXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwiYWNoLWRlYml0LWZ1bmRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgYmFua0FjY291bnQ6IHtcbiAgICAgIGJhbmtBY2NvdW50SUQ6IFwiM2FiYzY4MmEtMTUyMy00NWZiLTk3NzYtYjE0YzA1OGZjY2NmXCIsXG4gICAgICBmaW5nZXJwcmludDogXCJjMjJlMTNmYzIxZjgwMDZiNDBlYjRlNmJjMjE1YTVlMDVlZmY1ZDk4YzExMzZhMWVkNjA4OTBkNjZiYzVjMDU2XCIsXG4gICAgICBzdGF0dXM6IFwidmVyaWZpZWRcIixcbiAgICAgIGhvbGRlck5hbWU6IFwiV2ljIE5vb2RzXCIsXG4gICAgICBob2xkZXJUeXBlOiBcImluZGl2aWR1YWxcIixcbiAgICAgIGJhbmtOYW1lOiBcIlZFUklESUFOIENSRURJVCBVTklPTlwiLFxuICAgICAgYmFua0FjY291bnRUeXBlOiBcImNoZWNraW5nXCIsXG4gICAgICByb3V0aW5nTnVtYmVyOiBcIjI3Mzk3NjM2OVwiLFxuICAgICAgbGFzdEZvdXJBY2NvdW50TnVtYmVyOiBcIjQzMzNcIixcbiAgICB9LFxuICAgIGFjaDoge1xuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgdHJhY2VOdW1iZXI6IFwiMjIxNDc1Nzg4Njg3Nzc2XCIsXG4gICAgfSxcbiAgICBhY2hEZXRhaWxzOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJtb292LXdhbGxldFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICB3YWxsZXQ6IHtcbiAgICAgIHdhbGxldElEOiBcIjM1YmNlNjZlLWM4ZjItNDhlZC04ZmQwLWMwMmJmZDU1ZTcxYVwiLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBGYWlsZWRUcmFuc2ZlclBheWxvYWQgPSB7XG4gIHRyYW5zZmVySUQ6IFwiZWE5Njk2MmItY2YwYy00NDA5LTllZjYtZWFkM2FhN2Y2MTlhXCIsXG4gIGNyZWF0ZWRBdDogXCIyMDIyLTA1LTEzVDE0OjM1OjE1WlwiLFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxNDozNToxNVpcIixcbiAgc3RhdHVzOiBcImZhaWxlZFwiLFxuICBhbW91bnQ6IHtcbiAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICB2YWx1ZTogMzAwLFxuICB9LFxuICBmYWNpbGl0YXRvckZlZToge1xuICAgIHRvdGFsOiAwLFxuICB9LFxuICBzb3VyY2U6IHtcbiAgICBwYXltZW50TWV0aG9kSUQ6IFwiNWNjNThkNTktYTc5ZS00MWFkLTk5ZjMtN2UyMjNiYTk5ZWFhXCIsXG4gICAgcGF5bWVudE1ldGhvZFR5cGU6IFwiYWNoLWRlYml0LWZ1bmRcIixcbiAgICBhY2NvdW50OiB7XG4gICAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgICBlbWFpbDogXCJhbWFuZGFAY2xhc3Nib29rZXIuZGV2XCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb292IEZpbmFuY2lhbFwiLFxuICAgIH0sXG4gICAgYmFua0FjY291bnQ6IHtcbiAgICAgIGJhbmtBY2NvdW50SUQ6IFwiM2FiYzY4MmEtMTUyMy00NWZiLTk3NzYtYjE0YzA1OGZjY2NmXCIsXG4gICAgICBmaW5nZXJwcmludDogXCJjMjJlMTNmYzIxZjgwMDZiNDBlYjRlNmJjMjE1YTVlMDVlZmY1ZDk4YzExMzZhMWVkNjA4OTBkNjZiYzVjMDU2XCIsXG4gICAgICBzdGF0dXM6IFwidmVyaWZpZWRcIixcbiAgICAgIGhvbGRlck5hbWU6IFwiV2ljIE5vb2RzXCIsXG4gICAgICBob2xkZXJUeXBlOiBcImluZGl2aWR1YWxcIixcbiAgICAgIGJhbmtOYW1lOiBcIlZFUklESUFOIENSRURJVCBVTklPTlwiLFxuICAgICAgYmFua0FjY291bnRUeXBlOiBcImNoZWNraW5nXCIsXG4gICAgICByb3V0aW5nTnVtYmVyOiBcIjI3Mzk3NjM2OVwiLFxuICAgICAgbGFzdEZvdXJBY2NvdW50TnVtYmVyOiBcIjQzMzNcIixcbiAgICB9LFxuICAgIGFjaDoge1xuICAgICAgc3RhdHVzOiBcImNvbXBsZXRlZFwiLFxuICAgICAgdHJhY2VOdW1iZXI6IFwiMjIxNDc1Nzg4Njg3Nzc2XCIsXG4gICAgfSxcbiAgICBhY2hEZXRhaWxzOiB7XG4gICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICB0cmFjZU51bWJlcjogXCIyMjE0NzU3ODg2ODc3NzZcIixcbiAgICB9LFxuICB9LFxuICBkZXN0aW5hdGlvbjoge1xuICAgIHBheW1lbnRNZXRob2RJRDogXCJjZTBhMjdlNy01NzM1LTQ0MzItYTljOS0wOWM0ZDIwODI0MTFcIixcbiAgICBwYXltZW50TWV0aG9kVHlwZTogXCJtb292LXdhbGxldFwiLFxuICAgIGFjY291bnQ6IHtcbiAgICAgIGFjY291bnRJRDogXCJkNDQ5NjY5My1jYzUwLTQ2NmUtYWIwNy0zOTc0YmZlN2Y0YWNcIixcbiAgICAgIGVtYWlsOiBcImFtYW5kYUBjbGFzc2Jvb2tlci5kZXZcIixcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vb3YgRmluYW5jaWFsXCIsXG4gICAgfSxcbiAgICB3YWxsZXQ6IHtcbiAgICAgIHdhbGxldElEOiBcIjM1YmNlNjZlLWM4ZjItNDhlZC04ZmQwLWMwMmJmZDU1ZTcxYVwiLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBSZXZlcnNlZFRyYW5zYWN0aW9uQm9keSA9IHtcbiAgZXZlbnRJRDogXCI5N2M5YjEwMC1kZTUwLTQ0NjMtOGRmMC0xZWM4NDU3MTAxYmVcIixcbiAgdHlwZTogXCJ0cmFuc2Zlci51cGRhdGVkXCIsXG4gIGRhdGE6IHtcbiAgICBhY2NvdW50SUQ6IFwiYTA5Njc4NDgtZjQ5NC00ZmY0LWEzMDktOWJmY2Q3ZWNiZWUwXCIsXG4gICAgdHJhbnNmZXJJRDogXCI4OWZlMTI3Ny00MTBmLTRlODYtOTkxMS00NzIyZWMzOTc0YzlcIixcbiAgICBzdGF0dXM6IFwicmV2ZXJzZWRcIixcbiAgICBzb3VyY2U6IHt9LFxuICAgIGRlc3RpbmF0aW9uOiB7fSxcbiAgfSxcbiAgY3JlYXRlZE9uOiBcIjIwMjItMDUtMTNUMTU6NDk6MDMuNDU5OTE1MDg0WlwiLFxufTtcblxuY29uc3QgRmFpbGVkVHJhbnNhY3Rpb25Cb2R5ID0ge1xuICBldmVudElEOiBcIjk3YzliMTAwLWRlNTAtNDQ2My04ZGYwLTFlYzg0NTcxMDFiZVwiLFxuICB0eXBlOiBcInRyYW5zZmVyLnVwZGF0ZWRcIixcbiAgZGF0YToge1xuICAgIGFjY291bnRJRDogXCJhMDk2Nzg0OC1mNDk0LTRmZjQtYTMwOS05YmZjZDdlY2JlZTBcIixcbiAgICB0cmFuc2ZlcklEOiBcIjg5ZmUxMjc3LTQxMGYtNGU4Ni05OTExLTQ3MjJlYzM5NzRjOVwiLFxuICAgIHN0YXR1czogXCJmYWlsZWRcIixcbiAgICBzb3VyY2U6IHt9LFxuICAgIGRlc3RpbmF0aW9uOiB7fSxcbiAgfSxcbiAgY3JlYXRlZE9uOiBcIjIwMjItMDUtMTNUMTU6NDk6MDMuNDU5OTE1MDg0WlwiLFxufTtcblxuY29uc3QgQ29tcGxldGVkVHJhbnNhY3Rpb25Cb2R5ID0ge1xuICBldmVudElEOiBcIjk3YzliMTAwLWRlNTAtNDQ2My04ZGYwLTFlYzg0NTcxMDFiZVwiLFxuICB0eXBlOiBcInRyYW5zZmVyLnVwZGF0ZWRcIixcbiAgZGF0YToge1xuICAgIGFjY291bnRJRDogXCJhMDk2Nzg0OC1mNDk0LTRmZjQtYTMwOS05YmZjZDdlY2JlZTBcIixcbiAgICB0cmFuc2ZlcklEOiBcIjg5ZmUxMjc3LTQxMGYtNGU4Ni05OTExLTQ3MjJlYzM5NzRjOVwiLFxuICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIixcbiAgICBzb3VyY2U6IHt9LFxuICAgIGRlc3RpbmF0aW9uOiB7fSxcbiAgfSxcbiAgY3JlYXRlZE9uOiBcIjIwMjItMDUtMTNUMTU6NDk6MDMuNDU5OTE1MDg0WlwiLFxufTtcblxuY29uc3QgQ3JlYXRlZFRyYW5zYWN0aW9uQm9keSA9IHtcbiAgZXZlbnRJRDogXCI3ZDZkYTc4MS0yZjU3LTQ0ZjgtOWFiMC01YWY2OTEyNGE3NjhcIixcbiAgdHlwZTogXCJ0cmFuc2Zlci5jcmVhdGVkXCIsXG4gIGRhdGE6IHtcbiAgICBhY2NvdW50SUQ6IFwiZDQ0OTY2OTMtY2M1MC00NjZlLWFiMDctMzk3NGJmZTdmNGFjXCIsXG4gICAgdHJhbnNmZXJJRDogXCI3MWNkODQ5My0yN2Y1LTRmNTktOGY5YS1iN2NjZDA0ZmNlYzJcIixcbiAgICBzdGF0dXM6IFwiY3JlYXRlZFwiLFxuICB9LFxuICBjcmVhdGVkT246IFwiMjAyMi0wNS0xM1QxODowMjoxMS4xOTY2MjExMTNaXCIsXG59O1xuXG5sZXQgcGF5bG9hZHM6IHsgW3M6IHN0cmluZ106IGFueSB9ID0ge1xuICBcImUwN2JkODJlLTg3NWItNDEyMi05Mzc0LTRhMDM4NjBkYThjYVwiOiBSZXZlcnNlZFRyYW5zZmVyUGF5bG9hZCxcbiAgXCJlMDdiZDgyZS04NzViLTQxMjItOTM3NC00YTAzODYwZGE4Y2JcIjogQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkLFxuICBcImUwN2JkODJlLTg3NWItNDEyMi05Mzc0LTRhMDM4NjBkYThjY1wiOiBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRCYW5rMkJhbmssXG4gIFwiZTA3YmQ4MmUtODc1Yi00MTIyLTkzNzQtNGEwMzg2MGRhOGNkXCI6IENvbXBsZXRlZFRyYW5zZmVyUGF5bG9hZEJhbmsyQ2FyZCxcbiAgXCJlMDdiZDgyZS04NzViLTQxMjItOTM3NC00YTAzODYwZGE4Y2VcIjogQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkQmFuazJXYWxsZXQsXG4gIFwiZTA3YmQ4MmUtODc1Yi00MTIyLTkzNzQtNGEwMzg2MGRhOGNmXCI6IENvbXBsZXRlZFRyYW5zZmVyUGF5bG9hZENhcmQyQmFuayxcbiAgXCJlMDdiZDgyZS04NzViLTQxMjItOTM3NC00YTAzODYwZGE4Y2dcIjogQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkQ2FyZDJDYXJkLFxuICBcImUwN2JkODJlLTg3NWItNDEyMi05Mzc0LTRhMDM4NjBkYThjaFwiOiBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRDYXJkMldhbGxldCxcbiAgXCJlMDdiZDgyZS04NzViLTQxMjItOTM3NC00YTAzODYwZGE4Y2lcIjogQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkV2FsbGV0MkJhbmssXG4gIFwiZTA3YmQ4MmUtODc1Yi00MTIyLTkzNzQtNGEwMzg2MGRhOGNqXCI6IENvbXBsZXRlZFRyYW5zZmVyUGF5bG9hZFdhbGxldDJDYXJkLFxuICBcImUwN2JkODJlLTg3NWItNDEyMi05Mzc0LTRhMDM4NjBkYThja1wiOiBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRXYWxsZXQyV2FsbGV0LFxuICBcImUwN2JkODJlLTg3NWItNDEyMi05Mzc0LTRhMDM4NjBkYThjbFwiOiBDb21wbGV0ZWRUcmFuc2ZlclBheWxvYWRCYW5rMldhbGxldCxcbiAgXCJlMDdiZDgyZS04NzViLTQxMjItOTM3NC00YTAzODYwZGE4Y21cIjogUGVuZGluZ1RyYW5zZmVyUGF5bG9hZCxcbiAgXCJlMDdiZDgyZS04NzViLTQxMjItOTM3NC00YTAzODYwZGE4Y25cIjogRmFpbGVkVHJhbnNmZXJQYXlsb2FkLFxufVxuXG5cbmNsYXNzIE1vY2tNb292U2VydmljZSBpbXBsZW1lbnRzIElNb292U2VydmljZSB7XG4gIHBhcmVudFNlcnZpY2U6IElNb292U2VydmljZSB8IG51bGwgPSBudWxsO1xuXG4gIEZha2VHZXRUcmFuc2VyRGF0YSA9ICh0cmFuc2ZlcklEOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGlmICh0aGlzLnBhcmVudFNlcnZpY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudFNlcnZpY2UuZ2V0VHJhbnNmZXJEYXRhKHRyYW5zZmVySUQpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9O1xuXG4gIEZha2VDcmVhdGVUb2tlbigpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLnBhcmVudFNlcnZpY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudFNlcnZpY2UuY3JlYXRlVG9rZW4oKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgfVxuXG4gIGdldFRyYW5zZmVyRGF0YSh0cmFuc2ZlcklEOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLkZha2VHZXRUcmFuc2VyRGF0YSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5GYWtlR2V0VHJhbnNlckRhdGEodHJhbnNmZXJJRCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmVudFNlcnZpY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudFNlcnZpY2UuZ2V0VHJhbnNmZXJEYXRhKHRyYW5zZmVySUQpXG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSlcbiAgfVxuICBjcmVhdGVUb2tlbigpOiBQcm9taXNlPE1vb3ZUb2tlbj4ge1xuICAgIGlmICh0aGlzLkZha2VDcmVhdGVUb2tlbikge1xuICAgICAgcmV0dXJuIHRoaXMuRmFrZUNyZWF0ZVRva2VuKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmVudFNlcnZpY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudFNlcnZpY2UuY3JlYXRlVG9rZW4oKVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9IGFzIE1vb3ZUb2tlbilcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBTZW5kVHJhbnNhY3Rpb24oYm9keTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc29sZS5sb2coYm9keSlcbiAgYXdhaXQgY29uZmlndXJhdGlvbi5sb2FkKCk7XG4gIGNvbnN0IGNvbmZpZyA9IGNvbmZpZ3VyYXRpb24uYWN0aXZlKCk7XG4gIGNvbnN0IHVybCA9IGBodHRwOi8vbG9jYWxob3N0OiR7Y29uZmlnLnBvcnR9L3dlYmhvb2tzYDtcblxuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gIGNvbnN0IG5vbmNlID0gcmFuZG9tVVVJRCgpO1xuICBjb25zdCB3ZWJob29rSUQgPSByYW5kb21VVUlEKCk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGdlbmVyYXRlU2lnbmF0dXJlKHRpbWVzdGFtcCwgbm9uY2UsIHdlYmhvb2tJRCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXM6IFJlc3BvbnNlID0gYXdhaXQgZ290KHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwieC10aW1lc3RhbXBcIjogdGltZXN0YW1wLFxuICAgICAgICBcIngtbm9uY2VcIjogbm9uY2UsXG4gICAgICAgIFwieC13ZWJob29rLWlkXCI6IHdlYmhvb2tJRCxcbiAgICAgICAgXCJ4LXNpZ25hdHVyZVwiOiBzaWduYXR1cmUsXG4gICAgICB9LFxuICAgICAganNvbjogYm9keSxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhgUmVzcG9uc2U6ICR7cmVzLnN0YXR1c0NvZGV9YCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoYHNlbmRUcmFuc2ZlckV2ZW50IGZhaWxlZDogJHtidWlsZEdvdEVycm9yTWVzc2FnZShlcnIpfWApO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBUZXN0KG1vY2tNb292U2VydmljZTogTW9ja01vb3ZTZXJ2aWNlKSB7XG5cbiAgZm9yIChsZXQgaWQgaW4gcGF5bG9hZHMpIHtcbiAgICBsZXQgbmJvZHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KENyZWF0ZWRUcmFuc2FjdGlvbkJvZHkpKVxuICAgIG5ib2R5LmRhdGEudHJhbnNmZXJJRCA9IGlkXG4gICAgYXdhaXQgU2VuZFRyYW5zYWN0aW9uKG5ib2R5KVxuICB9XG5cblxuXG5cbiAgLy8gbW9ja01vb3ZTZXJ2aWNlLkZha2VHZXRUcmFuc2VyRGF0YSA9IGFzeW5jICh0cmFuc2ZlcklEOiBzdHJpbmcpID0+IHtcbiAgLy8gICBsZXQgYW1vdW50ID0gcmFuZG9tSW50KDEwMDAwMCk7XG4gIC8vICAgRmFpbGVkVHJhbnNmZXJQYXlsb2FkLmFtb3VudC52YWx1ZSA9IGFtb3VudDtcbiAgLy8gICBjb25zb2xlLmxvZyhgR2VuZXJhdGluZyBGYWlsZWQgdHJhbnNhY3Rpb24gb2YgJHthbW91bnR9YCk7XG4gIC8vICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShGYWlsZWRUcmFuc2ZlclBheWxvYWQpO1xuICAvLyB9O1xuXG4gIGF3YWl0IFNlbmRUcmFuc2FjdGlvbihGYWlsZWRUcmFuc2FjdGlvbkJvZHkpO1xuXG4gIC8vIG1vY2tNb292U2VydmljZS5GYWtlR2V0VHJhbnNlckRhdGEgPSBhc3luYyAodHJhbnNmZXJJRDogc3RyaW5nKSA9PiB7XG4gIC8vICAgbGV0IGFtb3VudCA9IHJhbmRvbUludCgxMDAwMDApO1xuICAvLyAgIFJldmVyc2VkVHJhbnNmZXJQYXlsb2FkLmFtb3VudC52YWx1ZSA9IGFtb3VudDtcbiAgLy8gICBjb25zb2xlLmxvZyhgR2VuZXJhdGluZyBSZXZlcnNlZCB0cmFuc2FjdGlvbiBvZiAke2Ftb3VudH1gKTtcbiAgLy8gICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFJldmVyc2VkVHJhbnNmZXJQYXlsb2FkKTtcbiAgLy8gfTtcblxuICBhd2FpdCBTZW5kVHJhbnNhY3Rpb24oUmV2ZXJzZWRUcmFuc2FjdGlvbkJvZHkpO1xuXG5cbiAgLy8gbW9ja01vb3ZTZXJ2aWNlLkZha2VHZXRUcmFuc2VyRGF0YSA9IGFzeW5jICh0cmFuc2ZlcklEOiBzdHJpbmcpID0+IHtcbiAgLy8gICBsZXQgYW1vdW50ID0gcmFuZG9tSW50KDEwMDAwMCk7XG4gIC8vICAgUGVuZGluZ1RyYW5zZmVyUGF5bG9hZC5hbW91bnQudmFsdWUgPSBhbW91bnQ7XG4gIC8vICAgY29uc29sZS5sb2coYEdlbmVyYXRpbmcgUGVuZGluZyB0cmFuc2FjdGlvbiBvZiAke2Ftb3VudH1gKTtcbiAgLy8gICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFBlbmRpbmdUcmFuc2ZlclBheWxvYWQpO1xuICAvLyB9O1xuXG4gIC8vIG1vY2tNb292U2VydmljZS5GYWtlR2V0VHJhbnNlckRhdGEgPSBhc3luYyAodHJhbnNmZXJJRDogc3RyaW5nKSA9PiB7XG4gIC8vICAgbGV0IGFtb3VudCA9IHJhbmRvbUludCgxMDAwMDApO1xuICAvLyAgIENvbXBsZXRlZFRyYW5zZmVyUGF5bG9hZC5hbW91bnQudmFsdWUgPSBhbW91bnQ7XG4gIC8vICAgY29uc29sZS5sb2coYEdlbmVyYXRpbmcgQ29tcGxldGVkIHRyYW5zYWN0aW9uIG9mICR7YW1vdW50fWApO1xuICAvLyAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoQ29tcGxldGVkVHJhbnNmZXJQYXlsb2FkKTtcbiAgLy8gfTtcblxuICBhd2FpdCBTZW5kVHJhbnNhY3Rpb24oQ29tcGxldGVkVHJhbnNhY3Rpb25Cb2R5KTtcblxuICBhd2FpdCBTZW5kVHJhbnNhY3Rpb24oQ3JlYXRlZFRyYW5zYWN0aW9uQm9keSk7XG5cblxufVxuXG4oYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGVudltcIk1PT1ZfQVBJX1VSTFwiXSA9IFwiaHR0cDovL2xvY2FsLm1vb3YuaW8vYXBpXCI7XG5cbiAgICBsZXQgbW9ja01vb3ZTZXJ2aWNlID0gbmV3IE1vY2tNb292U2VydmljZSgpO1xuICAgIG1vY2tNb292U2VydmljZS5wYXJlbnRTZXJ2aWNlID0gbmV3IE1vb3ZTZXJ2aWNlKCk7XG5cbiAgICBtb2NrTW9vdlNlcnZpY2UuRmFrZUdldFRyYW5zZXJEYXRhID0gYXN5bmMgKHRyYW5zZmVySUQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2codHJhbnNmZXJJRClcbiAgICAgIGxldCBib2R5ID0gcGF5bG9hZHNbdHJhbnNmZXJJRF1cbiAgICAgIGxldCBhbW91bnQgPSByYW5kb21JbnQoMTAwMDAwKTtcbiAgICAgIGJvZHkuYW1vdW50LnZhbHVlID0gYW1vdW50O1xuICAgICAgYm9keS50cmFuc2ZlcklEID0gdHJhbnNmZXJJRDtcbiAgICAgIHJldHVybiBib2R5XG4gIFxuICAgIH07XG5cbiAgICBFbnYuTW9vdlNlcnZpY2UgPSBtb2NrTW9vdlNlcnZpY2U7XG5cbiAgICBjb25zdCBjb25maWcgPSBhd2FpdCBjb25maWd1cmF0aW9uLmxvYWQoKTtcblxuICAgIGFwcC5zdGFydChjb25maWcpLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsb2FkaW5nIHNlcnZlcjpcIiArIGVycik7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBUZXN0KG1vY2tNb292U2VydmljZSk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgaWYgKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSB8fCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByb2Nlc3MuZXhpdCgxKTtcbn0pKCk7XG4iXX0=