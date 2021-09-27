"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(err) {
    const req = err.request;
    const res = err.response;
    if (req && res) {
        console.error(req.responseURL, res.status, res.data);
    }
}
exports.handleError = handleError;
