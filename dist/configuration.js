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
exports.active = exports.load = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const yaml = __importStar(require("yaml"));
const deepMerge_1 = __importDefault(require("./helpers/deepMerge"));
let config;
async function load() {
    const fileConfig = await loadFromFile();
    const envConfig = loadFromEnv();
    config = mergeAndValidate(envConfig, fileConfig);
    return config;
}
exports.load = load;
function active() {
    return config;
}
exports.active = active;
async function loadFromFile() {
    let config = {};
    try {
        const configPath = process.env.CONFIG_FILE_PATH || path.join(process.cwd(), "/config/config.yml");
        const contents = await fs.readFile(configPath, "utf8");
        config = yaml.parse(contents);
    }
    catch (err) {
        console.warn("unable to load configuration file:", err === null || err === void 0 ? void 0 : err.message);
    }
    return config;
}
function loadFromEnv() {
    return {
        slack: {
            token: process.env.SLACK_TOKEN || "",
            signingSecret: process.env.SLACK_SIGNING_SECRET || "",
            channel: process.env.SLACK_CHANNEL || "",
        },
        moov: {
            accountID: process.env.MOOV_ACCOUNT_ID || "",
            domain: process.env.MOOV_DOMAIN || "",
            publicKey: process.env.MOOV_PUBLIC_KEY || "",
            secretKey: process.env.MOOV_SECRET_KEY || "",
            webhookSecret: process.env.MOOV_WEBHOOK_SECRET || "",
            apiUrl: process.env.MOOV_API_URL || "https://api.moov.io",
        },
        port: +(process.env.PORT || 8080),
    };
}
function mergeAndValidate(envConfig, fileConfig) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const config = (0, deepMerge_1.default)(envConfig, fileConfig);
    const report = (name) => console.error(`error: configuration: missing ${name}`);
    if (!((_a = config.slack) === null || _a === void 0 ? void 0 : _a.token))
        report("slack.token");
    if (!((_b = config.slack) === null || _b === void 0 ? void 0 : _b.signingSecret))
        report("slack.signingSecret");
    if (!((_c = config.slack) === null || _c === void 0 ? void 0 : _c.channel))
        report("slack.channel");
    if (!((_d = config.moov) === null || _d === void 0 ? void 0 : _d.accountID))
        report("moov.accountID");
    if (!((_e = config.moov) === null || _e === void 0 ? void 0 : _e.domain))
        report("moov.domain");
    if (!((_f = config.moov) === null || _f === void 0 ? void 0 : _f.publicKey))
        report("moov.publicKey");
    if (!((_g = config.moov) === null || _g === void 0 ? void 0 : _g.secretKey))
        report("moov.secretKey");
    if (!((_h = config.moov) === null || _h === void 0 ? void 0 : _h.webhookSecret))
        report("moov.webhookSecret");
    return config;
}
