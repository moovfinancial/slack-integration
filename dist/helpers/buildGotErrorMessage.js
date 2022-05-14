"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildGotErrorMessage(err) {
    var _a;
    if (!err)
        return "(no error information)";
    const msg = [];
    if ((_a = err.request) === null || _a === void 0 ? void 0 : _a.requestUrl) {
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
exports.default = buildGotErrorMessage;
