import { View } from "@slack/bolt";

export function transferMessage(transfer: any) {
  const amount = +transfer.amount.value / 100;
  const status = transfer.status;
  const source = transfer.source.account.displayName;
  const destination = transfer.destination.account.displayName;
  const header = status === "pending" ? "Transfer created" : "Transfer completed :tada:";
  const description =
    status === "pending"
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
        value: `${transfer.transferID}`,
        action_id: "inspectTransfer",
      },
    },
  ];
}

export function transferDetails(transfer: any): View {
  const amount = +transfer.amount.value / 100;
  const type = transfer.type;
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
  const header =
    type === "transfer.created" ? "ACH transfer created" : ":tada:  ACH transfer complete";

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
            text:
              destinationBankAccountName +
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
            text: "*$" + amount + "*",
          },
        ],
      },
    ],
  };
}
