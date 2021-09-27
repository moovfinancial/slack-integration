import { RequestError } from "got";

export default function buildGotErrorMessage(err?: any): string {
  if (!err) return "(no error information)";

  const msg = [];
  if (err.request?.requestUrl) {
    msg.push(err.request.requestUrl);
  }
  msg.push(err.code);
  if (err.response) {
    msg.push(err.response.statusCode);
    if (err.response.body) {
      msg.push(JSON.stringify(err.response.body));
    }
  }

  return msg.join(" ");
}
