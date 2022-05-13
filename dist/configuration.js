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
        const configPath = process.env.CONFIG_FILE_PATH ||
            process.env.APP_CONFIG_SECRETS ||
            path.join(process.cwd(), "/config/config.yml");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBa0M7QUFDbEMsMkNBQTZCO0FBQzdCLDJDQUE2QjtBQUU3QixvRUFBNEM7QUFtQjVDLElBQUksTUFBcUIsQ0FBQztBQUVuQixLQUFLLFVBQVUsSUFBSTtJQUN4QixNQUFNLFVBQVUsR0FBRyxNQUFNLFlBQVksRUFBRSxDQUFDO0lBQ3hDLE1BQU0sU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFakQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQU5ELG9CQU1DO0FBRUQsU0FBZ0IsTUFBTTtJQUNwQixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRkQsd0JBRUM7QUFFRCxLQUFLLFVBQVUsWUFBWTtJQUN6QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFaEIsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQjtJQUFDLE9BQU8sR0FBUSxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsV0FBVztJQUNsQixPQUFPO1FBQ0wsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUU7WUFDcEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLElBQUksRUFBRTtZQUNyRCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksRUFBRTtTQUN6QztRQUNELElBQUksRUFBRTtZQUNKLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxFQUFFO1lBQzVDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFO1lBQ3JDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxFQUFFO1lBQzVDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxFQUFFO1lBQzVDLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixJQUFJLEVBQUU7WUFDcEQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLHFCQUFxQjtTQUMxRDtRQUNELElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0tBQ2xDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FDdkIsU0FBd0IsRUFDeEIsVUFBa0M7O0lBRWxDLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVMsRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFeEYsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRSxLQUFLLENBQUE7UUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRSxhQUFhLENBQUE7UUFBRSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNoRSxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQTtRQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLFNBQVMsQ0FBQTtRQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsTUFBTSxDQUFBO1FBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsU0FBUyxDQUFBO1FBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdEQsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxTQUFTLENBQUE7UUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RCxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLGFBQWEsQ0FBQTtRQUFFLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTlELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIHlhbWwgZnJvbSBcInlhbWxcIjtcblxuaW1wb3J0IGRlZXBNZXJnZSBmcm9tIFwiLi9oZWxwZXJzL2RlZXBNZXJnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ3VyYXRpb24ge1xuICBzbGFjazoge1xuICAgIHRva2VuOiBzdHJpbmc7XG4gICAgc2lnbmluZ1NlY3JldDogc3RyaW5nO1xuICAgIGNoYW5uZWw6IHN0cmluZztcbiAgfTtcbiAgbW9vdjoge1xuICAgIGFjY291bnRJRDogc3RyaW5nO1xuICAgIGRvbWFpbjogc3RyaW5nO1xuICAgIHB1YmxpY0tleTogc3RyaW5nO1xuICAgIHNlY3JldEtleTogc3RyaW5nO1xuICAgIHdlYmhvb2tTZWNyZXQ6IHN0cmluZztcbiAgICBhcGlVcmw6IHN0cmluZztcbiAgfTtcbiAgcG9ydDogbnVtYmVyO1xufVxuXG5sZXQgY29uZmlnOiBDb25maWd1cmF0aW9uO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZCgpOiBQcm9taXNlPENvbmZpZ3VyYXRpb24+IHtcbiAgY29uc3QgZmlsZUNvbmZpZyA9IGF3YWl0IGxvYWRGcm9tRmlsZSgpO1xuICBjb25zdCBlbnZDb25maWcgPSBsb2FkRnJvbUVudigpO1xuICBjb25maWcgPSBtZXJnZUFuZFZhbGlkYXRlKGVudkNvbmZpZywgZmlsZUNvbmZpZyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2ZSgpOiBDb25maWd1cmF0aW9uIHtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZEZyb21GaWxlKCk6IFByb21pc2U8UGFydGlhbDxDb25maWd1cmF0aW9uPj4ge1xuICBsZXQgY29uZmlnID0ge307XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjb25maWdQYXRoID1cbiAgICAgIHByb2Nlc3MuZW52LkNPTkZJR19GSUxFX1BBVEggfHxcbiAgICAgIHByb2Nlc3MuZW52LkFQUF9DT05GSUdfU0VDUkVUUyB8fFxuICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiL2NvbmZpZy9jb25maWcueW1sXCIpO1xuICAgIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUoY29uZmlnUGF0aCwgXCJ1dGY4XCIpO1xuICAgIGNvbmZpZyA9IHlhbWwucGFyc2UoY29udGVudHMpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGNvbnNvbGUud2FybihcInVuYWJsZSB0byBsb2FkIGNvbmZpZ3VyYXRpb24gZmlsZTpcIiwgZXJyPy5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldHVybiBjb25maWc7XG59XG5cbmZ1bmN0aW9uIGxvYWRGcm9tRW52KCk6IENvbmZpZ3VyYXRpb24ge1xuICByZXR1cm4ge1xuICAgIHNsYWNrOiB7XG4gICAgICB0b2tlbjogcHJvY2Vzcy5lbnYuU0xBQ0tfVE9LRU4gfHwgXCJcIixcbiAgICAgIHNpZ25pbmdTZWNyZXQ6IHByb2Nlc3MuZW52LlNMQUNLX1NJR05JTkdfU0VDUkVUIHx8IFwiXCIsXG4gICAgICBjaGFubmVsOiBwcm9jZXNzLmVudi5TTEFDS19DSEFOTkVMIHx8IFwiXCIsXG4gICAgfSxcbiAgICBtb292OiB7XG4gICAgICBhY2NvdW50SUQ6IHByb2Nlc3MuZW52Lk1PT1ZfQUNDT1VOVF9JRCB8fCBcIlwiLFxuICAgICAgZG9tYWluOiBwcm9jZXNzLmVudi5NT09WX0RPTUFJTiB8fCBcIlwiLFxuICAgICAgcHVibGljS2V5OiBwcm9jZXNzLmVudi5NT09WX1BVQkxJQ19LRVkgfHwgXCJcIixcbiAgICAgIHNlY3JldEtleTogcHJvY2Vzcy5lbnYuTU9PVl9TRUNSRVRfS0VZIHx8IFwiXCIsXG4gICAgICB3ZWJob29rU2VjcmV0OiBwcm9jZXNzLmVudi5NT09WX1dFQkhPT0tfU0VDUkVUIHx8IFwiXCIsXG4gICAgICBhcGlVcmw6IHByb2Nlc3MuZW52Lk1PT1ZfQVBJX1VSTCB8fCBcImh0dHBzOi8vYXBpLm1vb3YuaW9cIixcbiAgICB9LFxuICAgIHBvcnQ6ICsocHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDgwKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VBbmRWYWxpZGF0ZShcbiAgZW52Q29uZmlnOiBDb25maWd1cmF0aW9uLFxuICBmaWxlQ29uZmlnOiBQYXJ0aWFsPENvbmZpZ3VyYXRpb24+XG4pOiBDb25maWd1cmF0aW9uIHtcbiAgY29uc3QgY29uZmlnID0gZGVlcE1lcmdlKGVudkNvbmZpZywgZmlsZUNvbmZpZyk7XG4gIGNvbnN0IHJlcG9ydCA9IChuYW1lOiBzdHJpbmcpID0+IGNvbnNvbGUuZXJyb3IoYGVycm9yOiBjb25maWd1cmF0aW9uOiBtaXNzaW5nICR7bmFtZX1gKTtcblxuICBpZiAoIWNvbmZpZy5zbGFjaz8udG9rZW4pIHJlcG9ydChcInNsYWNrLnRva2VuXCIpO1xuICBpZiAoIWNvbmZpZy5zbGFjaz8uc2lnbmluZ1NlY3JldCkgcmVwb3J0KFwic2xhY2suc2lnbmluZ1NlY3JldFwiKTtcbiAgaWYgKCFjb25maWcuc2xhY2s/LmNoYW5uZWwpIHJlcG9ydChcInNsYWNrLmNoYW5uZWxcIik7XG4gIGlmICghY29uZmlnLm1vb3Y/LmFjY291bnRJRCkgcmVwb3J0KFwibW9vdi5hY2NvdW50SURcIik7XG4gIGlmICghY29uZmlnLm1vb3Y/LmRvbWFpbikgcmVwb3J0KFwibW9vdi5kb21haW5cIik7XG4gIGlmICghY29uZmlnLm1vb3Y/LnB1YmxpY0tleSkgcmVwb3J0KFwibW9vdi5wdWJsaWNLZXlcIik7XG4gIGlmICghY29uZmlnLm1vb3Y/LnNlY3JldEtleSkgcmVwb3J0KFwibW9vdi5zZWNyZXRLZXlcIik7XG4gIGlmICghY29uZmlnLm1vb3Y/LndlYmhvb2tTZWNyZXQpIHJlcG9ydChcIm1vb3Yud2ViaG9va1NlY3JldFwiKTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuIl19