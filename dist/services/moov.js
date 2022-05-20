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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9vdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9tb292LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIsZ0VBQWtEO0FBQ2xELDJGQUFtRTtBQVluRSxNQUFhLFdBQVc7SUFDdEIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFrQjtRQUN0QyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sY0FBYyxVQUFVLEVBQUUsQ0FBQztRQUU1RCxJQUFJLFFBQWEsQ0FBQztRQUNsQixJQUFJO1lBQ0YsUUFBUSxHQUFHLE1BQU0sSUFBQSxhQUFHLEVBQUM7Z0JBQ25CLEdBQUc7Z0JBQ0gsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsWUFBWSxFQUFFO29CQUNaLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7aUJBQ2pDO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxhQUFhLEVBQUUsVUFBVSxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUN0QyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNO2lCQUMzQjthQUNGLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNYO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLEdBQUcsR0FBRyxnQ0FBZ0MsSUFBQSw4QkFBb0IsRUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVc7UUFDZixNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sZUFBZSxDQUFDO1FBRWpELElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUk7WUFDRixNQUFNLEdBQUcsTUFBTSxJQUFBLGFBQUcsRUFBQztnQkFDakIsR0FBRztnQkFDSCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFLG9CQUFvQjtvQkFDaEMsS0FBSyxFQUFFLHdCQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsaUJBQWlCO2lCQUN0RTtnQkFDRCxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUMvQixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO2FBQ2hDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNYO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLEdBQUcsR0FBRyw0QkFBNEIsR0FBRyxJQUFJLElBQUEsOEJBQW9CLEVBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMzRSxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFOUUsT0FBTztZQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWTtZQUMxQixTQUFTO1NBQ1YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXZERCxrQ0F1REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ290IGZyb20gXCJnb3RcIjtcblxuaW1wb3J0ICogYXMgY29uZmlndXJhdGlvbiBmcm9tIFwiLi4vY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IGJ1aWxkR290RXJyb3JNZXNzYWdlIGZyb20gXCIuLi9oZWxwZXJzL2J1aWxkR290RXJyb3JNZXNzYWdlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9vdlRva2VuIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgZXhwaXJlc09uOiBudW1iZXI7IC8vIHNlY29uZHMgZnJvbSBlcG9jaFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNb292U2VydmljZSB7XG4gIGdldFRyYW5zZmVyRGF0YSh0cmFuc2ZlcklEOiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG4gIGNyZWF0ZVRva2VuKCk6IFByb21pc2U8TW9vdlRva2VuPjtcbn1cblxuZXhwb3J0IGNsYXNzIE1vb3ZTZXJ2aWNlIHtcbiAgYXN5bmMgZ2V0VHJhbnNmZXJEYXRhKHRyYW5zZmVySUQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgY29uZmlnID0gY29uZmlndXJhdGlvbi5hY3RpdmUoKTtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuY3JlYXRlVG9rZW4oKTtcbiAgICBjb25zdCB1cmwgPSBgJHtjb25maWcubW9vdi5hcGlVcmx9L3RyYW5zZmVycy8ke3RyYW5zZmVySUR9YDtcblxuICAgIGxldCB0cmFuc2ZlcjogYW55O1xuICAgIHRyeSB7XG4gICAgICB0cmFuc2ZlciA9IGF3YWl0IGdvdCh7XG4gICAgICAgIHVybCxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBzZWFyY2hQYXJhbXM6IHtcbiAgICAgICAgICBhY2NvdW50SWQ6IGNvbmZpZy5tb292LmFjY291bnRJRCxcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbi52YWx1ZX1gLFxuICAgICAgICAgIE9yaWdpbjogY29uZmlnLm1vb3YuZG9tYWluLFxuICAgICAgICB9LFxuICAgICAgfSkuanNvbigpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID0gYG1vb3YuZ2V0VHJhbnNmZXJEYXRhIGZhaWxlZDogJHtidWlsZEdvdEVycm9yTWVzc2FnZShlcnIpfWA7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmZXI7XG4gIH1cblxuICBhc3luYyBjcmVhdGVUb2tlbigpOiBQcm9taXNlPE1vb3ZUb2tlbj4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IGNvbmZpZ3VyYXRpb24uYWN0aXZlKCk7XG4gICAgY29uc3QgdXJsID0gYCR7Y29uZmlnLm1vb3YuYXBpVXJsfS9vYXV0aDIvdG9rZW5gO1xuXG4gICAgbGV0IHJlc3VsdDogYW55O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBnb3Qoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICBncmFudF90eXBlOiBcImNsaWVudF9jcmVkZW50aWFsc1wiLFxuICAgICAgICAgIHNjb3BlOiBgL3BpbmcucmVhZCAvYWNjb3VudHMvJHtjb25maWcubW9vdi5hY2NvdW50SUR9L3RyYW5zZmVycy5yZWFkYCxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlcm5hbWU6IGNvbmZpZy5tb292LnB1YmxpY0tleSxcbiAgICAgICAgcGFzc3dvcmQ6IGNvbmZpZy5tb292LnNlY3JldEtleSxcbiAgICAgIH0pLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IG1zZyA9IGBtb292LmNyZWF0ZVRva2VuIGZhaWxlZDogJHt1cmx9ICR7YnVpbGRHb3RFcnJvck1lc3NhZ2UoZXJyKX1gO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgY29uc3QgZXhwaXJlc09uID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApIC0gcmVzdWx0LmV4cGlyZXNfaW47XG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHJlc3VsdC5hY2Nlc3NfdG9rZW4sXG4gICAgICBleHBpcmVzT24sXG4gICAgfTtcbiAgfVxufSJdfQ==