"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferDetails = exports.transferMessage = void 0;
function transferMessage(transferData) {
    const amount = transferData.data.transfer.amount.value;
    const type = transferData.type;
    const source = transferData.data.transfer.source.account.displayName;
    const destination = transferData.data.transfer.destination.account.displayName;
    const header = type === "transfer.created" ? "ACH transfer created" : "ACH transfer completed :tada:";
    const description = type === "transfer.created"
        ? "A transfer of *$" +
            amount +
            "* from *" +
            source +
            "s* to *" +
            destination +
            "* is pending."
        : "*" + source + "* sent *$" + amount + "* to *" + destination + "*.";
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
                value: "click_me_123",
                action_id: "button-action",
            },
        },
    ];
}
exports.transferMessage = transferMessage;
function transferDetails(transferData) {
    const amount = transferData.data.transfer.amount.value;
    const type = transferData.type;
    const source = transferData.data.transfer.source.account.displayName;
    const sourceEmail = transferData.data.transfer.source.account.email;
    const sourceBankAccountName = transferData.data.transfer.source.bankAccount.bankName;
    const sourceBankAccountType = transferData.data.transfer.source.bankAccount.bankAccountType;
    const sourceBankAccountLastNumber = transferData.data.transfer.source.bankAccount.lastFourAccountNumber;
    const destination = transferData.data.transfer.destination.account.displayName;
    const destinationEmail = transferData.data.transfer.destination.account.email;
    const destinationBankAccountName = transferData.data.transfer.destination.bankAccount.bankName;
    const destinationBankAccountType = transferData.data.transfer.destination.bankAccount.bankAccountType;
    const destinationBankAccountLastNumber = transferData.data.transfer.destination.bankAccount.lastFourAccountNumber;
    const header = type === "transfer.created" ? "ACH transfer created" : ":tada:  ACH transfer complete";
    return {
        type: "modal",
        title: {
            type: "plain_text",
            text: "My App",
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
                        text: destinationBankAccountName +
                            "\n" +
                            destinationBankAccountType +
                            " • " +
                            destinationBankAccountLastNumber,
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
                        text: "*$" + amount + ".00 USD*",
                    },
                ],
            },
        ],
    };
}
exports.transferDetails = transferDetails;
