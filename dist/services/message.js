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
function resolveHeader(transfer) {
    let src = "";
    let dst = "";
    let status = transfer.status;
    if (transfer.source.bankAccount) {
        src = "Bank";
    }
    else if (transfer.source.wallet) {
        src = "Wallet";
    }
    else {
        src = "Card";
    }
    if (transfer.destination.bankAccount) {
        dst = "Bank";
    }
    else if (transfer.destination.wallet) {
        dst = "Wallet";
    }
    else {
        dst = "Card";
    }
    switch (status) {
        case cnt.TRANSFER_STATUS_PENDING:
            status = "Transfer created";
            break;
        case cnt.TRANSFER_STATUS_FAILED:
            status = ":exclamation: Transfer failed";
            break;
        case cnt.TRANSFER_STATUS_REVERSED:
            status = "Transfer reversed";
            break;
        case cnt.TRANSFER_STATUS_COMPLETED:
        default:
            status = ":tada:  Transfer complete";
            break;
    }
    return `${src} to ${dst}: ${status}`;
}
function resolveDetails(transfer) {
    let ret = { Dst: "", Src: "" };
    if (transfer.source.bankAccount) {
        ret.Src = transfer.source.bankAccount.bankName + "\n" +
            transfer.source.bankAccount.bankAccountType +
            " • " +
            transfer.source.bankAccount.lastFourAccountNumber;
    }
    else if (transfer.source.wallet) {
        ret.Src = "Moov Wallet";
    }
    else {
        ret.Src = "Card";
    }
    if (transfer.destination.bankAccount) {
        ret.Dst = transfer.destination.bankAccount.bankName + "\n" +
            transfer.destination.bankAccount.bankAccountType +
            " • " +
            transfer.destination.bankAccount.lastFourAccountNumber;
    }
    else if (transfer.destination.wallet) {
        ret.Dst = "Moov Wallet";
    }
    else {
        ret.Dst = "Card";
    }
    return ret;
}
function transferDetails(transfer) {
    const amount = +transfer.amount.value / 100;
    const status = transfer.status;
    const source = transfer.source.account.displayName;
    const sourceEmail = transfer.source.account.email;
    const destination = transfer.destination.account.displayName;
    const destinationEmail = transfer.destination.account.email;
    let header = resolveHeader(transfer);
    let details = resolveDetails(transfer);
    //let sourceDetails: string = "Moov wallet";
    // if (transfer.source.bankAccount) {
    //   sourceDetails = transfer.source.bankAccount.bankName + "\n" +
    //     transfer.source.bankAccount.bankAccountType +
    //     " • " +
    //     transfer.source.bankAccount.lastFourAccountNumber;
    // }
    // let destinationDetails: string = "Moov wallet";
    // if (transfer.destination.bankAccount) {
    //   destinationDetails = transfer.destination.bankAccount.bankName + "\n" +
    //     transfer.destination.bankAccount.bankAccountType +
    //     " • " +
    //     transfer.destination.bankAccount.lastFourAccountNumber;
    // }
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
                        text: details.Src,
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
                        text: details.Dst,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxrREFBb0M7QUFFcEMsU0FBZ0IsZUFBZSxDQUFDLElBQVksRUFBRSxRQUFhO0lBQ3pELE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzVDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNuRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDN0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUVyQixRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssR0FBRyxDQUFDLGdCQUFnQjtZQUN2QixNQUFNLEdBQUcsa0JBQWtCLENBQUM7WUFDNUIsV0FBVztnQkFDVCxrQkFBa0I7b0JBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNqQixVQUFVO29CQUNWLE1BQU07b0JBQ04sUUFBUTtvQkFDUixXQUFXO29CQUNYLGVBQWUsQ0FBQztZQUNsQixNQUFNO1FBQ1I7WUFDRSxRQUFRLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLEtBQUssR0FBRyxDQUFDLHdCQUF3QjtvQkFDL0IsTUFBTSxHQUFHLG1CQUFtQixDQUFDO29CQUM3QixXQUFXO3dCQUNULGtCQUFrQjs0QkFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLFVBQVU7NEJBQ1YsTUFBTTs0QkFDTixRQUFROzRCQUNSLFdBQVc7NEJBQ1gsc0JBQXNCLENBQUM7b0JBQ3pCLE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTSxHQUFHLDJC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LE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsV0FBVyxHQUFHLElBQUksR0FBRyxnQkFBZ0I7cUJBQzVDO29CQUNEO3dCQUNFLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRztxQkFDbEI7aUJBQ0Y7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxTQUFTO2FBQ2hCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFO29CQUNOO3dCQUNFLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxVQUFVO3FCQUNqQjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsR0FBRztxQkFDVjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztxQkFDckM7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUF6R0QsMENBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gXCJAc2xhY2svYm9sdFwiO1xuaW1wb3J0IHsgY3JlYXRlTm9kZSB9IGZyb20gXCJ5YW1sXCI7XG5pbXBvcnQgKiBhcyBjbnQgZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmZXJNZXNzYWdlKHR5cGU6IHN0cmluZywgdHJhbnNmZXI6IGFueSkge1xuICBjb25zdCBhbW91bnQgPSArdHJhbnNmZXIuYW1vdW50LnZhbHVlIC8gMTAwO1xuICBjb25zdCBzb3VyY2UgPSB0cmFuc2Zlci5zb3VyY2UuYWNjb3VudC5kaXNwbGF5TmFtZTtcbiAgY29uc3QgZGVzdGluYXRpb24gPSB0cmFuc2Zlci5kZXN0aW5hdGlvbi5hY2NvdW50LmRpc3BsYXlOYW1lO1xuICBsZXQgaGVhZGVyID0gXCJcIjtcbiAgbGV0IGRlc2NyaXB0aW9uID0gXCJcIjtcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIGNudC5UUkFOU0ZFUl9DUkVBVEVEOlxuICAgICAgaGVhZGVyID0gXCJUcmFuc2ZlciBjcmVhdGVkXCI7XG4gICAgICBkZXNjcmlwdGlvbiA9XG4gICAgICAgIFwiQSB0cmFuc2ZlciBvZiAqJFwiICtcbiAgICAgICAgYW1vdW50LnRvRml4ZWQoMikgK1xuICAgICAgICBcIiogZnJvbSAqXCIgK1xuICAgICAgICBzb3VyY2UgK1xuICAgICAgICBcIiogdG8gKlwiICtcbiAgICAgICAgZGVzdGluYXRpb24gK1xuICAgICAgICBcIiogaXMgcGVuZGluZy5cIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzd2l0Y2ggKHRyYW5zZmVyLnN0YXR1cykge1xuICAgICAgICBjYXNlIGNudC5UUkFOU0ZFUl9TVEFUVVNfUkVWRVJTRUQ6XG4gICAgICAgICAgaGVhZGVyID0gXCJUcmFuc2ZlciByZXZlcnNlZFwiO1xuICAgICAgICAgIGRlc2NyaXB0aW9uID1cbiAgICAgICAgICAgIFwiQSB0cmFuc2ZlciBvZiAqJFwiICtcbiAgICAgICAgICAgIGFtb3VudC50b0ZpeGVkKDIpICtcbiAgICAgICAgICAgIFwiKiBmcm9tICpcIiArXG4gICAgICAgICAgICBzb3VyY2UgK1xuICAgICAgICAgICAgXCIqIHRvICpcIiArXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiArXG4gICAgICAgICAgICBcIiogaGFzIGJlZW4gcmV2ZXJzZWQuXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaGVhZGVyID0gXCJUcmFuc2ZlciBjb21wbGV0ZWQgOnRhZGE6XCI7XG4gICAgICAgICAgZGVzY3JpcHRpb24gPVxuICAgICAgICAgICAgXCIqXCIgKyBzb3VyY2UgKyBcIiogc2VudCAqJFwiICsgYW1vdW50LnRvRml4ZWQoMikgKyBcIiogdG8gKlwiICsgZGVzdGluYXRpb24gKyBcIiouXCI7XG4gICAgICB9XG4gIH1cblxuICAvL1RPRE86UkVNT1ZFXG4gIGNvbnNvbGUubG9nKGBDcmVhdGluZyAke3RyYW5zZmVyLnRyYW5zZmVySUR9IHdpdGggdmFsdWU6ICR7YW1vdW50fWApXG4gIHJldHVybiBbXG4gICAge1xuICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgIHRleHQ6IHtcbiAgICAgICAgdHlwZTogXCJwbGFpbl90ZXh0XCIsXG4gICAgICAgIHRleHQ6IGhlYWRlcixcbiAgICAgICAgZW1vamk6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogXCJzZWN0aW9uXCIsXG4gICAgICB0ZXh0OiB7XG4gICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgIHRleHQ6IGRlc2NyaXB0aW9uLFxuICAgICAgfSxcbiAgICAgIGFjY2Vzc29yeToge1xuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdHlwZTogXCJwbGFpbl90ZXh0XCIsXG4gICAgICAgICAgdGV4dDogXCJEZXRhaWxzXCIsXG4gICAgICAgICAgZW1vamk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiBgJHt0cmFuc2Zlci50cmFuc2ZlcklEfWAsXG4gICAgICAgIGFjdGlvbl9pZDogXCJpbnNwZWN0VHJhbnNmZXJcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUhlYWRlcih0cmFuc2ZlcjogYW55KTogc3RyaW5nIHtcbiAgbGV0IHNyYyA9IFwiXCI7XG4gIGxldCBkc3QgPSBcIlwiO1xuXG5cbiAgbGV0IHN0YXR1cyA9IHRyYW5zZmVyLnN0YXR1cztcblxuICBpZiAodHJhbnNmZXIuc291cmNlLmJhbmtBY2NvdW50KSB7XG4gICAgc3JjID0gXCJCYW5rXCJcbiAgfSBlbHNlIGlmICh0cmFuc2Zlci5zb3VyY2Uud2FsbGV0KSB7XG4gICAgc3JjID0gXCJXYWxsZXRcIlxuICB9IGVsc2Uge1xuICAgIHNyYyA9IFwiQ2FyZFwiXG4gIH1cblxuICBpZiAodHJhbnNmZXIuZGVzdGluYXRpb24uYmFua0FjY291bnQpIHtcbiAgICBkc3QgPSBcIkJhbmtcIlxuICB9IGVsc2UgaWYgKHRyYW5zZmVyLmRlc3RpbmF0aW9uLndhbGxldCkge1xuICAgIGRzdCA9IFwiV2FsbGV0XCJcbiAgfSBlbHNlIHtcbiAgICBkc3QgPSBcIkNhcmRcIlxuICB9XG5cbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIGNudC5UUkFOU0ZFUl9TVEFUVVNfUEVORElORzpcbiAgICAgIHN0YXR1cyA9IFwiVHJhbnNmZXIgY3JlYXRlZFwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBjbnQuVFJBTlNGRVJfU1RBVFVTX0ZBSUxFRDpcbiAgICAgIHN0YXR1cyA9IFwiOmV4Y2xhbWF0aW9uOiBUcmFuc2ZlciBmYWlsZWRcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgY250LlRSQU5TRkVSX1NUQVRVU19SRVZFUlNFRDpcbiAgICAgIHN0YXR1cyA9IFwiVHJhbnNmZXIgcmV2ZXJzZWRcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgY250LlRSQU5TRkVSX1NUQVRVU19DT01QTEVURUQ6XG4gICAgZGVmYXVsdDpcbiAgICAgIHN0YXR1cyA9IFwiOnRhZGE6ICBUcmFuc2ZlciBjb21wbGV0ZVwiO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYCR7c3JjfSB0byAke2RzdH06ICR7c3RhdHVzfWBcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2ZlckRldGFpbHMge1xuICBTcmM6IHN0cmluZ1xuICBEc3Q6IHN0cmluZ1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRGV0YWlscyh0cmFuc2ZlcjogYW55KTogVHJhbnNmZXJEZXRhaWxzIHtcbiAgbGV0IHJldDogVHJhbnNmZXJEZXRhaWxzID0geyBEc3Q6IFwiXCIsIFNyYzogXCJcIiB9XG5cbiAgaWYgKHRyYW5zZmVyLnNvdXJjZS5iYW5rQWNjb3VudCkge1xuICAgIHJldC5TcmMgPSB0cmFuc2Zlci5zb3VyY2UuYmFua0FjY291bnQuYmFua05hbWUgKyBcIlxcblwiICtcbiAgICAgIHRyYW5zZmVyLnNvdXJjZS5iYW5rQWNjb3VudC5iYW5rQWNjb3VudFR5cGUgK1xuICAgICAgXCIg4oCiIFwiICtcbiAgICAgIHRyYW5zZmVyLnNvdXJjZS5iYW5rQWNjb3VudC5sYXN0Rm91ckFjY291bnROdW1iZXI7XG4gIH0gZWxzZSBpZiAodHJhbnNmZXIuc291cmNlLndhbGxldCkge1xuICAgIHJldC5TcmMgPSBcIk1vb3YgV2FsbGV0XCJcbiAgfSBlbHNlIHtcbiAgICByZXQuU3JjID0gXCJDYXJkXCJcbiAgfVxuXG4gIGlmICh0cmFuc2Zlci5kZXN0aW5hdGlvbi5iYW5rQWNjb3VudCkge1xuICAgIHJldC5Ec3QgPSB0cmFuc2Zlci5kZXN0aW5hdGlvbi5iYW5rQWNjb3VudC5iYW5rTmFtZSArIFwiXFxuXCIgK1xuICAgICAgdHJhbnNmZXIuZGVzdGluYXRpb24uYmFua0FjY291bnQuYmFua0FjY291bnRUeXBlICtcbiAgICAgIFwiIOKAoiBcIiArXG4gICAgICB0cmFuc2Zlci5kZXN0aW5hdGlvbi5iYW5rQWNjb3VudC5sYXN0Rm91ckFjY291bnROdW1iZXI7XG4gIH0gZWxzZSBpZiAodHJhbnNmZXIuZGVzdGluYXRpb24ud2FsbGV0KSB7XG4gICAgcmV0LkRzdCA9IFwiTW9vdiBXYWxsZXRcIlxuICB9IGVsc2Uge1xuICAgIHJldC5Ec3QgPSBcIkNhcmRcIlxuICB9XG5cbiAgcmV0dXJuIHJldFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmZXJEZXRhaWxzKHRyYW5zZmVyOiBhbnkpOiBWaWV3IHtcbiAgY29uc3QgYW1vdW50ID0gK3RyYW5zZmVyLmFtb3VudC52YWx1ZSAvIDEwMDtcbiAgY29uc3Qgc3RhdHVzID0gdHJhbnNmZXIuc3RhdHVzO1xuICBjb25zdCBzb3VyY2UgPSB0cmFuc2Zlci5zb3VyY2UuYWNjb3VudC5kaXNwbGF5TmFtZTtcbiAgY29uc3Qgc291cmNlRW1haWwgPSB0cmFuc2Zlci5zb3VyY2UuYWNjb3VudC5lbWFpbDtcbiAgY29uc3QgZGVzdGluYXRpb24gPSB0cmFuc2Zlci5kZXN0aW5hdGlvbi5hY2NvdW50LmRpc3BsYXlOYW1lO1xuICBjb25zdCBkZXN0aW5hdGlvbkVtYWlsID0gdHJhbnNmZXIuZGVzdGluYXRpb24uYWNjb3VudC5lbWFpbDtcblxuICBsZXQgaGVhZGVyOiBzdHJpbmcgPSByZXNvbHZlSGVhZGVyKHRyYW5zZmVyKVxuICBsZXQgZGV0YWlsczogVHJhbnNmZXJEZXRhaWxzID0gcmVzb2x2ZURldGFpbHModHJhbnNmZXIpXG4gIC8vbGV0IHNvdXJjZURldGFpbHM6IHN0cmluZyA9IFwiTW9vdiB3YWxsZXRcIjtcblxuICAvLyBpZiAodHJhbnNmZXIuc291cmNlLmJhbmtBY2NvdW50KSB7XG4gIC8vICAgc291cmNlRGV0YWlscyA9IHRyYW5zZmVyLnNvdXJjZS5iYW5rQWNjb3VudC5iYW5rTmFtZSArIFwiXFxuXCIgK1xuICAvLyAgICAgdHJhbnNmZXIuc291cmNlLmJhbmtBY2NvdW50LmJhbmtBY2NvdW50VHlwZSArXG4gIC8vICAgICBcIiDigKIgXCIgK1xuICAvLyAgICAgdHJhbnNmZXIuc291cmNlLmJhbmtBY2NvdW50Lmxhc3RGb3VyQWNjb3VudE51bWJlcjtcbiAgLy8gfVxuXG4gIC8vIGxldCBkZXN0aW5hdGlvbkRldGFpbHM6IHN0cmluZyA9IFwiTW9vdiB3YWxsZXRcIjtcblxuICAvLyBpZiAodHJhbnNmZXIuZGVzdGluYXRpb24uYmFua0FjY291bnQpIHtcbiAgLy8gICBkZXN0aW5hdGlvbkRldGFpbHMgPSB0cmFuc2Zlci5kZXN0aW5hdGlvbi5iYW5rQWNjb3VudC5iYW5rTmFtZSArIFwiXFxuXCIgK1xuICAvLyAgICAgdHJhbnNmZXIuZGVzdGluYXRpb24uYmFua0FjY291bnQuYmFua0FjY291bnRUeXBlICtcbiAgLy8gICAgIFwiIOKAoiBcIiArXG4gIC8vICAgICB0cmFuc2Zlci5kZXN0aW5hdGlvbi5iYW5rQWNjb3VudC5sYXN0Rm91ckFjY291bnROdW1iZXI7XG4gIC8vIH1cblxuICByZXR1cm4ge1xuICAgIHR5cGU6IFwibW9kYWxcIixcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogXCJwbGFpbl90ZXh0XCIsXG4gICAgICB0ZXh0OiBcIk1vb3ZcIixcbiAgICAgIGVtb2ppOiB0cnVlLFxuICAgIH0sXG4gICAgYmxvY2tzOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICB0eXBlOiBcInBsYWluX3RleHRcIixcbiAgICAgICAgICB0ZXh0OiBoZWFkZXIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBcImRpdmlkZXJcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwic2VjdGlvblwiLFxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdHlwZTogXCJtcmtkd25cIixcbiAgICAgICAgICB0ZXh0OiBcIipTb3VyY2UqXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgICAgICB0ZXh0OiBzb3VyY2UgKyBcIlxcblwiICsgc291cmNlRW1haWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcIm1ya2R3blwiLFxuICAgICAgICAgICAgdGV4dDogZGV0YWlscy5TcmMsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiZGl2aWRlclwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJzZWN0aW9uXCIsXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICB0eXBlOiBcIm1ya2R3blwiLFxuICAgICAgICAgIHRleHQ6IFwiKkRlc3RpbmF0aW9uKlwiLFxuICAgICAgICB9LFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcIm1ya2R3blwiLFxuICAgICAgICAgICAgdGV4dDogZGVzdGluYXRpb24gKyBcIlxcblwiICsgZGVzdGluYXRpb25FbWFpbCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgICAgICB0ZXh0OiBkZXRhaWxzLkRzdCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJkaXZpZGVyXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBcInNlY3Rpb25cIixcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtcmtkd25cIixcbiAgICAgICAgICAgIHRleHQ6IFwiKkFtb3VudCpcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIiBcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIiokXCIgKyBhbW91bnQudG9GaXhlZCgyKSArIFwiKlwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG59XG4iXX0=