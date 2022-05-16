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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoovService = void 0;
const got_1 = __importDefault(require("got"));
const configuration = __importStar(require("../configuration"));
const buildGotErrorMessage_1 = __importDefault(require("../helpers/buildGotErrorMessage"));
class MoovService {
    async getTransferData(transferID) {
        const config = configuration.active();
        const token = await this.createToken();
        const url = `${config.moov.apiUrl}/transfers/${transferID}`;
        let transfer;
        try {
            transfer = await (0, got_1.default)({
                url,
                method: "GET",
                searchParams: {
                    accountId: config.moov.accountID,
                },
                headers: {
                    Authorization: `Bearer ${token.value}`,
                    Origin: config.moov.domain,
                },
            }).json();
        }
        catch (err) {
            const msg = `moov.getTransferData failed: ${(0, buildGotErrorMessage_1.default)(err)}`;
            throw new Error(msg);
        }
        return transfer;
    }
    async createToken() {
        const config = configuration.active();
        const url = `${config.moov.apiUrl}/oauth2/token`;
        let result;
        try {
            result = await (0, got_1.default)({
                url,
                method: "POST",
                form: {
                    grant_type: "client_credentials",
                    scope: `/ping.read /accounts/${config.moov.accountID}/transfers.read`,
                },
                username: config.moov.publicKey,
                password: config.moov.secretKey,
            }).json();
        }
        catch (err) {
            const msg = `moov.createToken failed: ${url} ${(0, buildGotErrorMessage_1.default)(err)}`;
            throw new Error(msg);
        }
        const expiresOn = Math.round(new Date().getTime() / 1000) - result.expires_in;
        return {
            value: result.access_token,
            expiresOn,
        };
    }
}
exports.MoovService = MoovService;
