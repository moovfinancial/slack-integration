"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferDetails = exports.transferMessage = void 0;
function transferMessage(type, transfer) {
    const amount = +transfer.amount.value / 100;
    const source = transfer.source.account.displayName;
    const destination = transfer.destination.account.displayName;
    let header = null;
    let description = null;
    if (type === "transfer.created") {
        header = "Transfer created";
        description =
            "A transfer of *$" +
                amount.toFixed(2) +
                "* from *" +
                source +
                "* to *" +
                destination +
                "* is pending.";
    }
    else if (type === "transfer.updated") {
        if (transfer.status === "completed") {
            header = "Transfer completed :tada:";
            description = "*" + source + "* sent *$" + amount.toFixed(2) + "* to *" + destination + "*.";
        }
        else if (transfer.status === "failed") {
            header = "Transfer failed :x:";
            description =
                "*" + source + "* failed to send *$" + amount.toFixed(2) + "* to *" + destination + "*.";
        }
        else if (transfer.status === "reversed") {
            header = "Transfer reversed :leftwards_arrow_with_hook:";
            description =
                "*" + destination + "* sent *$" + amount.toFixed(2) + "* back to *" + source + "*.";
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
    const amount = +transfer.amount.value / 100;
    const status = transfer.status;
    const source = transfer.source.account.displayName;
    const sourceEmail = transfer.source.account.email;
    const destination = transfer.destination.account.displayName;
    const destinationEmail = transfer.destination.account.email;
    const sourceBlock = getDetailsBlock(transfer.source);
    const destinationBlock = getDetailsBlock(transfer.destination);
    let header = "";
    switch (status) {
        case "pending":
            header = "Transfer created";
            break;
        case "completed":
            header = ":tada: Transfer completed";
            break;
        case "failed":
            header = "Transfer failed";
            break;
        case "reversed":
            header = "Transfer reversed";
            break;
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
                    sourceBlock,
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
                    destinationBlock,
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
function getDetailsBlock(details) {
    let text = "";
    if (details.bankAccount) {
        text =
            details.bankAccount.bankName +
                "\n" +
                details.bankAccount.bankAccountType +
                "\n" +
                details.bankAccount.lastFourAccountNumber;
    }
    else if (details.wallet) {
        text = "Instant transfer";
    }
    else if (details.card) {
        text =
            details.card.brand +
                "\n" +
                details.card.lastFourCardNumber +
                "\n" +
                details.card.expiration.month +
                "/" +
                details.card.expiration.year;
    }
    return { type: "mrkdwn", text };
}
