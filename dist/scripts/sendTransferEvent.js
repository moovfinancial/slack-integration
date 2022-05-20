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
const crypto_1 = require("crypto");
const got_1 = __importDefault(require("got"));
const configuration = __importStar(require("../configuration"));
const buildGotErrorMessage_1 = __importDefault(require("../helpers/buildGotErrorMessage"));
const authentication_1 = require("../services/authentication");
(async () => {
    await configuration.load();
    const config = configuration.active();
    const url = `http://localhost:${config.port}/webhooks`;
    const timestamp = new Date().toISOString();
    const nonce = (0, crypto_1.randomUUID)();
    const webhookID = (0, crypto_1.randomUUID)();
    const signature = (0, authentication_1.generateSignature)(timestamp, nonce, webhookID);
    try {
        const res = await (0, got_1.default)({
            url,
            method: "POST",
            headers: {
                "x-timestamp": timestamp,
                "x-nonce": nonce,
                "x-webhook-id": webhookID,
                "x-signature": signature,
            },
            json: {
                eventID: (0, crypto_1.randomUUID)(),
                type: "transfer.updated",
                data: {
                    transferID: process.argv[2],
                    status: "completed",
                },
                createdOn: new Date().toISOString(),
            },
        });
        console.log(`Response: ${res.statusCode}`);
    }
    catch (err) {
        console.error(`sendTransferEvent failed: ${(0, buildGotErrorMessage_1.default)(err)}`);
        process.exit(1);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZFRyYW5zZmVyRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9zZW5kVHJhbnNmZXJFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEM7QUFDMUMsOENBQW9DO0FBR3BDLGdFQUFrRDtBQUNsRCwyRkFBbUU7QUFDbkUsK0RBQStEO0FBRS9ELENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDVixNQUFNLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEMsTUFBTSxHQUFHLEdBQUcsb0JBQW9CLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQztJQUV2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUEsbUJBQVUsR0FBRSxDQUFDO0lBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUEsbUJBQVUsR0FBRSxDQUFDO0lBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUEsa0NBQWlCLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVqRSxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQWEsTUFBTSxJQUFBLGFBQUcsRUFBQztZQUM5QixHQUFHO1lBQ0gsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFLFNBQVM7Z0JBQ3hCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixjQUFjLEVBQUUsU0FBUztnQkFDekIsYUFBYSxFQUFFLFNBQVM7YUFDekI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLElBQUEsbUJBQVUsR0FBRTtnQkFDckIsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsTUFBTSxFQUFFLFdBQVc7aUJBQ3BCO2dCQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTthQUNwQztTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztLQUM1QztJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsSUFBQSw4QkFBb0IsRUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByYW5kb21VVUlELCBzaWduIH0gZnJvbSBcImNyeXB0b1wiO1xuaW1wb3J0IGdvdCwgeyBSZXNwb25zZSB9IGZyb20gXCJnb3RcIjtcblxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcIi4uL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBjb25maWd1cmF0aW9uIGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgYnVpbGRHb3RFcnJvck1lc3NhZ2UgZnJvbSBcIi4uL2hlbHBlcnMvYnVpbGRHb3RFcnJvck1lc3NhZ2VcIjtcbmltcG9ydCB7IGdlbmVyYXRlU2lnbmF0dXJlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uXCI7XG5cbihhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGNvbmZpZ3VyYXRpb24ubG9hZCgpO1xuICBjb25zdCBjb25maWcgPSBjb25maWd1cmF0aW9uLmFjdGl2ZSgpO1xuICBjb25zdCB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDoke2NvbmZpZy5wb3J0fS93ZWJob29rc2A7XG5cbiAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICBjb25zdCBub25jZSA9IHJhbmRvbVVVSUQoKTtcbiAgY29uc3Qgd2ViaG9va0lEID0gcmFuZG9tVVVJRCgpO1xuICBjb25zdCBzaWduYXR1cmUgPSBnZW5lcmF0ZVNpZ25hdHVyZSh0aW1lc3RhbXAsIG5vbmNlLCB3ZWJob29rSUQpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzOiBSZXNwb25zZSA9IGF3YWl0IGdvdCh7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIngtdGltZXN0YW1wXCI6IHRpbWVzdGFtcCxcbiAgICAgICAgXCJ4LW5vbmNlXCI6IG5vbmNlLFxuICAgICAgICBcIngtd2ViaG9vay1pZFwiOiB3ZWJob29rSUQsXG4gICAgICAgIFwieC1zaWduYXR1cmVcIjogc2lnbmF0dXJlLFxuICAgICAgfSxcbiAgICAgIGpzb246IHtcbiAgICAgICAgZXZlbnRJRDogcmFuZG9tVVVJRCgpLFxuICAgICAgICB0eXBlOiBcInRyYW5zZmVyLnVwZGF0ZWRcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRyYW5zZmVySUQ6IHByb2Nlc3MuYXJndlsyXSxcbiAgICAgICAgICBzdGF0dXM6IFwiY29tcGxldGVkXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZWRPbjogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhgUmVzcG9uc2U6ICR7cmVzLnN0YXR1c0NvZGV9YCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoYHNlbmRUcmFuc2ZlckV2ZW50IGZhaWxlZDogJHtidWlsZEdvdEVycm9yTWVzc2FnZShlcnIpfWApO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufSkoKTtcbiJdfQ==