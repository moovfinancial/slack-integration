"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(err) {
    const req = err.request;
    const res = err.response;
    if (req && res) {
        console.error(req, res.status, res.data);
    }
    else if (req) {
        console.error(req.responseURL);
    }
}
exports.handleError = handleError;
