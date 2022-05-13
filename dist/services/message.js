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
function transferDetails(transfer) {
    const amount = +transfer.amount.value / 100;
    const status = transfer.status;
    const source = transfer.source.account.displayName;
    const sourceEmail = transfer.source.account.email;
    const sourceBankAccountName = transfer.source.bankAccount.bankName;
    const sourceBankAccountType = transfer.source.bankAccount.bankAccountType;
    const sourceBankAccountLastNumber = transfer.source.bankAccount.lastFourAccountNumber;
    const destination = transfer.destination.account.displayName;
    const destinationEmail = transfer.destination.account.email;
    const destinationBankAccountName = transfer.destination.bankAccount.bankName;
    const destinationBankAccountType = transfer.destination.bankAccount.bankAccountType;
    const destinationBankAccountLastNumber = transfer.destination.bankAccount.lastFourAccountNumber;
    let header = "";
    switch (status) {
        case cnt.TRANSFER_STATUS_PENDING:
            header = "ACH transfer created";
            break;
        case cnt.TRANSFER_STATUS_REVERSED:
            header = "ACH transfer reversed";
            break;
        case cnt.TRANSFER_STATUS_COMPLETED:
        default:
            header = ":tada:  ACH transfer complete";
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
                        text: "*$" + amount.toFixed(2) + "*",
                    },
                ],
            },
        ],
    };
}
exports.transferDetails = transferDetails;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxrREFBb0M7QUFFcEMsU0FBZ0IsZUFBZSxDQUFDLElBQVksRUFBRSxRQUFhO0lBQ3pELE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzVDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNuRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDN0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUVyQixRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssR0FBRyxDQUFDLGdCQUFnQjtZQUN2QixNQUFNLEdBQUcsa0JBQWtCLENBQUM7WUFDNUIsV0FBVztnQkFDVCxrQkFBa0I7b0JBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNqQixVQUFVO29CQUNWLE1BQU07b0JBQ04sUUFBUTtvQkFDUixXQUFXO29CQUNYLGVBQWUsQ0FBQztZQUNsQixNQUFNO1FBQ1I7WUFDRSxRQUFRLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLEtBQUssR0FBRyxDQUFDLHdCQUF3QjtvQkFDL0IsTUFBTSxHQUFHLG1CQUFtQixDQUFDO29CQUM3QixXQUFXO3dCQUNULGtCQUFrQjs0QkFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLFVBQVU7NEJBQ1YsTUFBTTs0QkFDTixRQUFROzRCQUNSLFdBQVc7NEJBQ1gsc0JBQXNCLENBQUM7b0JBQ3pCLE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTSxHQUFHLDJC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SSxFQUFFLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7cUJBQ3JDO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDO0FBakhELDBDQWlIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiQHNsYWNrL2JvbHRcIjtcbmltcG9ydCB7IGNyZWF0ZU5vZGUgfSBmcm9tIFwieWFtbFwiO1xuaW1wb3J0ICogYXMgY250IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZmVyTWVzc2FnZSh0eXBlOiBzdHJpbmcsIHRyYW5zZmVyOiBhbnkpIHtcbiAgY29uc3QgYW1vdW50ID0gK3RyYW5zZmVyLmFtb3VudC52YWx1ZSAvIDEwMDtcbiAgY29uc3Qgc291cmNlID0gdHJhbnNmZXIuc291cmNlLmFjY291bnQuZGlzcGxheU5hbWU7XG4gIGNvbnN0IGRlc3RpbmF0aW9uID0gdHJhbnNmZXIuZGVzdGluYXRpb24uYWNjb3VudC5kaXNwbGF5TmFtZTtcbiAgbGV0IGhlYWRlciA9IFwiXCI7XG4gIGxldCBkZXNjcmlwdGlvbiA9IFwiXCI7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBjbnQuVFJBTlNGRVJfQ1JFQVRFRDpcbiAgICAgIGhlYWRlciA9IFwiVHJhbnNmZXIgY3JlYXRlZFwiO1xuICAgICAgZGVzY3JpcHRpb24gPVxuICAgICAgICBcIkEgdHJhbnNmZXIgb2YgKiRcIiArXG4gICAgICAgIGFtb3VudC50b0ZpeGVkKDIpICtcbiAgICAgICAgXCIqIGZyb20gKlwiICtcbiAgICAgICAgc291cmNlICtcbiAgICAgICAgXCIqIHRvICpcIiArXG4gICAgICAgIGRlc3RpbmF0aW9uICtcbiAgICAgICAgXCIqIGlzIHBlbmRpbmcuXCI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgc3dpdGNoICh0cmFuc2Zlci5zdGF0dXMpIHtcbiAgICAgICAgY2FzZSBjbnQuVFJBTlNGRVJfU1RBVFVTX1JFVkVSU0VEOlxuICAgICAgICAgIGhlYWRlciA9IFwiVHJhbnNmZXIgcmV2ZXJzZWRcIjtcbiAgICAgICAgICBkZXNjcmlwdGlvbiA9XG4gICAgICAgICAgICBcIkEgdHJhbnNmZXIgb2YgKiRcIiArXG4gICAgICAgICAgICBhbW91bnQudG9GaXhlZCgyKSArXG4gICAgICAgICAgICBcIiogZnJvbSAqXCIgK1xuICAgICAgICAgICAgc291cmNlICtcbiAgICAgICAgICAgIFwiKiB0byAqXCIgK1xuICAgICAgICAgICAgZGVzdGluYXRpb24gK1xuICAgICAgICAgICAgXCIqIGhhcyBiZWVuIHJldmVyc2VkLlwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGhlYWRlciA9IFwiVHJhbnNmZXIgY29tcGxldGVkIDp0YWRhOlwiO1xuICAgICAgICAgIGRlc2NyaXB0aW9uID1cbiAgICAgICAgICAgIFwiKlwiICsgc291cmNlICsgXCIqIHNlbnQgKiRcIiArIGFtb3VudC50b0ZpeGVkKDIpICsgXCIqIHRvICpcIiArIGRlc3RpbmF0aW9uICsgXCIqLlwiO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgdGV4dDoge1xuICAgICAgICB0eXBlOiBcInBsYWluX3RleHRcIixcbiAgICAgICAgdGV4dDogaGVhZGVyLFxuICAgICAgICBlbW9qaTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiBcInNlY3Rpb25cIixcbiAgICAgIHRleHQ6IHtcbiAgICAgICAgdHlwZTogXCJtcmtkd25cIixcbiAgICAgICAgdGV4dDogZGVzY3JpcHRpb24sXG4gICAgICB9LFxuICAgICAgYWNjZXNzb3J5OiB7XG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICB0eXBlOiBcInBsYWluX3RleHRcIixcbiAgICAgICAgICB0ZXh0OiBcIkRldGFpbHNcIixcbiAgICAgICAgICBlbW9qaTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IGAke3RyYW5zZmVyLnRyYW5zZmVySUR9YCxcbiAgICAgICAgYWN0aW9uX2lkOiBcImluc3BlY3RUcmFuc2ZlclwiLFxuICAgICAgfSxcbiAgICB9LFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmZXJEZXRhaWxzKHRyYW5zZmVyOiBhbnkpOiBWaWV3IHtcbiAgY29uc3QgYW1vdW50ID0gK3RyYW5zZmVyLmFtb3VudC52YWx1ZSAvIDEwMDtcbiAgY29uc3Qgc3RhdHVzID0gdHJhbnNmZXIuc3RhdHVzO1xuICBjb25zdCBzb3VyY2UgPSB0cmFuc2Zlci5zb3VyY2UuYWNjb3VudC5kaXNwbGF5TmFtZTtcbiAgY29uc3Qgc291cmNlRW1haWwgPSB0cmFuc2Zlci5zb3VyY2UuYWNjb3VudC5lbWFpbDtcbiAgY29uc3Qgc291cmNlQmFua0FjY291bnROYW1lID0gdHJhbnNmZXIuc291cmNlLmJhbmtBY2NvdW50LmJhbmtOYW1lO1xuICBjb25zdCBzb3VyY2VCYW5rQWNjb3VudFR5cGUgPSB0cmFuc2Zlci5zb3VyY2UuYmFua0FjY291bnQuYmFua0FjY291bnRUeXBlO1xuICBjb25zdCBzb3VyY2VCYW5rQWNjb3VudExhc3ROdW1iZXIgPSB0cmFuc2Zlci5zb3VyY2UuYmFua0FjY291bnQubGFzdEZvdXJBY2NvdW50TnVtYmVyO1xuICBjb25zdCBkZXN0aW5hdGlvbiA9IHRyYW5zZmVyLmRlc3RpbmF0aW9uLmFjY291bnQuZGlzcGxheU5hbWU7XG4gIGNvbnN0IGRlc3RpbmF0aW9uRW1haWwgPSB0cmFuc2Zlci5kZXN0aW5hdGlvbi5hY2NvdW50LmVtYWlsO1xuICBjb25zdCBkZXN0aW5hdGlvbkJhbmtBY2NvdW50TmFtZSA9IHRyYW5zZmVyLmRlc3RpbmF0aW9uLmJhbmtBY2NvdW50LmJhbmtOYW1lO1xuICBjb25zdCBkZXN0aW5hdGlvbkJhbmtBY2NvdW50VHlwZSA9IHRyYW5zZmVyLmRlc3RpbmF0aW9uLmJhbmtBY2NvdW50LmJhbmtBY2NvdW50VHlwZTtcbiAgY29uc3QgZGVzdGluYXRpb25CYW5rQWNjb3VudExhc3ROdW1iZXIgPSB0cmFuc2Zlci5kZXN0aW5hdGlvbi5iYW5rQWNjb3VudC5sYXN0Rm91ckFjY291bnROdW1iZXI7XG4gIGxldCBoZWFkZXIgPSBcIlwiO1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgY250LlRSQU5TRkVSX1NUQVRVU19QRU5ESU5HOlxuICAgICAgaGVhZGVyID0gXCJBQ0ggdHJhbnNmZXIgY3JlYXRlZFwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBjbnQuVFJBTlNGRVJfU1RBVFVTX1JFVkVSU0VEOlxuICAgICAgaGVhZGVyID0gXCJBQ0ggdHJhbnNmZXIgcmV2ZXJzZWRcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgY250LlRSQU5TRkVSX1NUQVRVU19DT01QTEVURUQ6XG4gICAgZGVmYXVsdDpcbiAgICAgIGhlYWRlciA9IFwiOnRhZGE6ICBBQ0ggdHJhbnNmZXIgY29tcGxldGVcIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJtb2RhbFwiLFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBcInBsYWluX3RleHRcIixcbiAgICAgIHRleHQ6IFwiTW9vdlwiLFxuICAgICAgZW1vamk6IHRydWUsXG4gICAgfSxcbiAgICBibG9ja3M6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgIHR5cGU6IFwicGxhaW5fdGV4dFwiLFxuICAgICAgICAgIHRleHQ6IGhlYWRlcixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiZGl2aWRlclwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJzZWN0aW9uXCIsXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICB0eXBlOiBcIm1ya2R3blwiLFxuICAgICAgICAgIHRleHQ6IFwiKlNvdXJjZSpcIixcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtcmtkd25cIixcbiAgICAgICAgICAgIHRleHQ6IHNvdXJjZSArIFwiXFxuXCIgKyBzb3VyY2VFbWFpbCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICBzb3VyY2VCYW5rQWNjb3VudE5hbWUgK1xuICAgICAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICAgICAgc291cmNlQmFua0FjY291bnRUeXBlICtcbiAgICAgICAgICAgICAgXCIg4oCiIFwiICtcbiAgICAgICAgICAgICAgc291cmNlQmFua0FjY291bnRMYXN0TnVtYmVyLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBcImRpdmlkZXJcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwic2VjdGlvblwiLFxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgdHlwZTogXCJtcmtkd25cIixcbiAgICAgICAgICB0ZXh0OiBcIipEZXN0aW5hdGlvbipcIixcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtcmtkd25cIixcbiAgICAgICAgICAgIHRleHQ6IGRlc3RpbmF0aW9uICsgXCJcXG5cIiArIGRlc3RpbmF0aW9uRW1haWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcIm1ya2R3blwiLFxuICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgZGVzdGluYXRpb25CYW5rQWNjb3VudE5hbWUgK1xuICAgICAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICAgICAgZGVzdGluYXRpb25CYW5rQWNjb3VudFR5cGUgK1xuICAgICAgICAgICAgICBcIiDigKIgXCIgK1xuICAgICAgICAgICAgICBkZXN0aW5hdGlvbkJhbmtBY2NvdW50TGFzdE51bWJlcixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJkaXZpZGVyXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBcInNlY3Rpb25cIixcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtcmtkd25cIixcbiAgICAgICAgICAgIHRleHQ6IFwiKkFtb3VudCpcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIiBcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibXJrZHduXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIiokXCIgKyBhbW91bnQudG9GaXhlZCgyKSArIFwiKlwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG59XG4iXX0=