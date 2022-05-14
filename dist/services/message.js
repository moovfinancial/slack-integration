"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferDetails = exports.transferMessage = void 0;
const cnt = __importStar(require("../constants"));
function transferMessage(type, transfer) {
    const amount = +transfer.amount.value / 100;
    const source = transfer.source.account.displayName;
    const destination = transfer.destination.account.displayName;
    let header = "";
    let description = "";
    switch (type) {
        case cnt.TRANSFER_CREATED:
            header = "Transfer created";
            description =
                "A transfer of *$" +
                    amount.toFixed(2) +
                    "* from *" +
                    source +
                    "* to *" +
                    destination +
                    "* is pending.";
            break;
        default:
            switch (transfer.status) {
                case cnt.TRANSFER_STATUS_REVERSED:
                    header = "Transfer reversed";
                    description =
                        "A transfer of *$" +
                            amount.toFixed(2) +
                            "* from *" +
                            source +
                            "* to *" +
                            destination +
                            "* has been reversed.";
                    break;
                default:
                    header = "Transfer completed :tada:";
                    description =
                        "*" + source + "* sent *$" + amount.toFixed(2) + "* to *" + destination + "*.";
            }
    }
    return [
        {
            type: "header",
            text: {
                type: "plain_text",
                text: header,
                emoji: true,
            },
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: description,
            },
            accessory: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Details",
                    emoji: true,
                },
                value: `${transfer.transferID}`,
                action_id: "inspectTransfer",
            },
        },
    ];
}
exports.transferMessage = transferMessage;
function transferDetails(transfer) {
    var _a, _b, _c;
    const amount = +transfer.amount.value / 100;
    const status = transfer.status;
    const source = transfer.source.account.displayName;
    const sourceEmail = transfer.source.account.email;
    const sourceBankAccountName = transfer.source.bankAccount.bankName;
    const sourceBankAccountType = transfer.source.bankAccount.bankAccountType;
    const sourceBankAccountLastNumber = transfer.source.bankAccount.lastFourAccountNumber;
    const destination = transfer.destination.account.displayName;
    const destinationEmail = transfer.destination.account.email;
    let header = "";
    switch (status) {
        case cnt.TRANSFER_STATUS_PENDING:
            header = "ACH transfer created";
            break;
        case cnt.TRANSFER_STATUS_FAILED:
            header = ":exclamation: ACH transfer failed";
            break;
        case cnt.TRANSFER_STATUS_REVERSED:
            header = "ACH transfer reversed";
            break;
        case cnt.TRANSFER_STATUS_COMPLETED:
        default:
            header = ":tada:  ACH transfer complete";
            break;
    }
    let destinationDetails = "Moov wallet";
    if (transfer.destination.bankAccount) {
        destinationDetails =
            ((_a = transfer.destination.bankAccount) === null || _a === void 0 ? void 0 : _a.bankName) +
                "\n" +
                ((_b = transfer.destination.bankAccount) === null || _b === void 0 ? void 0 : _b.bankAccountType) +
                " • " +
                ((_c = transfer.destination.bankAccount) === null || _c === void 0 ? void 0 : _c.lastFourAccountNumber);
    }
    return {
        type: "modal",
        title: {
            type: "plain_text",
            text: "Moov",
            emoji: true,
        },
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: header,
                },
            },
            {
                type: "divider",
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Source*",
                },
                fields: [
                    {
                        type: "mrkdwn",
                        text: source + "\n" + sourceEmail,
                    },
                    {
                        type: "mrkdwn",
                        text: sourceBankAccountName +
                            "\n" +
                            sourceBankAccountType +
                            " • " +
                            sourceBankAccountLastNumber,
                    },
                ],
            },
            {
                type: "divider",
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Destination*",
                },
                fields: [
                    {
                        type: "mrkdwn",
                        text: destination + "\n" + destinationEmail,
                    },
                    {
                        type: "mrkdwn",
                        text: destinationDetails,
                    },
                ],
            },
            {
                type: "divider",
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: "*Amount*",
                    },
                    {
                        type: "mrkdwn",
                        text: " ",
                    },
                    {
                        type: "mrkdwn",
                        text: "*$" + amount.toFixed(2) + "*",
                    },
                ],
            },
        ],
    };
}
exports.transferDetails = transferDetails;
