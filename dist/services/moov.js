"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferData = void 0;
const configuration_1 = require("../configuration");
const got_1 = __importDefault(require("got"));
const buildGotErrorMessage_1 = __importDefault(require("../helpers/buildGotErrorMessage"));
async function getTransferData(transferID) {
    // TODO: Create token and get transfer data
}
exports.getTransferData = getTransferData;
async function createToken(accountID) {
    const config = (0, configuration_1.active)();
    const url = config.moov.apiUrl + "/oauth2/token";
    let result;
    try {
        result = await (0, got_1.default)({
            url,
            method: "POST",
            form: {
                grant_type: "client_credentials",
                scope: `/ping.read /accounts/${accountID}/transfers.read`,
            },
            username: config.moov.publicKey,
            password: config.moov.secretKey,
        }).json();
    }
    catch (err) {
        const msg = `moov.fetchCredentials failed: ${(0, buildGotErrorMessage_1.default)(err)}`;
        throw new Error(msg);
    }
    const expiresOn = Math.round(new Date().getTime() / 1000) - result.expires_in;
    return {
        value: result.access_token,
        expiresOn,
    };
}
