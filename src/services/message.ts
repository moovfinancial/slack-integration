import { View } from "@slack/bolt";

export function transferMessage(type: string, transfer: any) {
  const amount = +transfer.amount.value / 100;
  const source = transfer.source.account.displayName;
  const destination = transfer.destination.account.displayName;
  const header = type === "transfer.created" ? "Transfer created" : "Transfer completed :tada:";
  const description =
    type === "transfer.created"
      ? "A transfer of *$" +
        amount.toFixed(2) +
        "* from *" +
        source +
        "* to *" +
        destination +
        "* is pending."
      : "*" + source + "* sent *$" + amount.toFixed(2) + "* to *" + destination + "*.";

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

export function transferDetails(transfer: any): View {
  const amount = +transfer.amount.value / 100;
  const status = transfer.status;
  const source = transfer.source.account.displayName;
  const sourceEmail = transfer.source.account.email;
  const sourceBankAccountName = transfer.source.bankAccount.bankName;
  const sourceBankAccountType = transfer.source.bankAccount.bankAccountType;
  const sourceBankAccountLastNumber = transfer.source.bankAccount.lastFourAccountNumber;
  const destination = transfer.destination.account.displayName;
  const destinationEmail = transfer.destination.account.email;

  let header: string = "";
  switch(status) {
    case "pending":
      header = "ACH transfer created";
      break;
    case "failed":
      header = ":exclamation: ACH transfer failed";
      break;
    default:
      header = ":tada: ACH transfer complete"
      break;
  }

  let destinationDetails: string = "Moov wallet";

  if (transfer.destination.bankAccount) {
    destinationDetails = transfer.destination.bankAccount.bankName + "\n" +
    transfer.destination.bankAccount.bankAccountType +
    " • " +
    transfer.destination.bankAccount.lastFourAccountNumber;
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
            text:
              sourceBankAccountName +
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
