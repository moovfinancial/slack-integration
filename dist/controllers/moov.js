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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookEvent = void 0;
const authentication_1 = require("../services/authentication");
const env_1 = require("../services/env");
const CNT = __importStar(require("../constants"));
const eventMap = {};
eventMap[CNT.TRANSFER_CREATED] = handleTransfer;
eventMap[CNT.TRANSFER_UPDATED] = handleTransfer;
async function handleWebhookEvent(req, res) {
    if (!(0, authentication_1.signatureIsValid)(req.headers)) {
        const headers = {};
        ["x-timestamp", "x-nonce", "x-webhook-id", "x-signature"].forEach((key) => {
            headers[key] = req.headers[key] || "";
        });
        console.warn(`handleWebhookEvent: invalid signature: headers:`, headers);
        res.sendStatus(403);
        return;
    }
    console.log(`handleWebhookEvent: `, req.body);
    const event = req.body.type;
    const handler = eventMap[event];
    if (handler) {
        try {
            await handler(event, req.body);
        }
        catch (err) {
            console.error("handleWebhookEvent: handler failed: ", (err === null || err === void 0 ? void 0 : err.message) || err);
        }
    }
    res.sendStatus(200);
}
exports.handleWebhookEvent = handleWebhookEvent;
async function handleTransfer(type, body) {
    var _a, _b, _c, _d;
    if (type === CNT.TRANSFER_UPDATED &&
        ((_a = body.data) === null || _a === void 0 ? void 0 : _a.status) !== CNT.TRANSFER_STATUS_COMPLETED &&
        ((_b = body.data) === null || _b === void 0 ? void 0 : _b.status) !== CNT.TRANSFER_STATUS_REVERSED)
        return;
    const transferID = ((_c = body.data) === null || _c === void 0 ? void 0 : _c.transferID) || ((_d = body.data) === null || _d === void 0 ? void 0 : _d.TransferID);
    await env_1.Env.SlackService.sendTransferMessage(type, transferID);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9vdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9tb292LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrREFBOEQ7QUFDOUQseUNBQXNDO0FBQ3RDLGtEQUFvQztBQUlwQyxNQUFNLFFBQVEsR0FBaUMsRUFBRSxDQUFDO0FBRWxELFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxjQUFjLENBQUM7QUFDaEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGNBQWMsQ0FBQztBQUV6QyxLQUFLLFVBQVUsa0JBQWtCLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDbEUsSUFBSSxDQUFDLElBQUEsaUNBQWdCLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sT0FBTyxHQUEyQixFQUFFLENBQUM7UUFDM0MsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQVksSUFBSSxFQUFFLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGlEQUFpRCxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pFLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsT0FBTztLQUNSO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUMsTUFBTSxLQUFLLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDcEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhDLElBQUksT0FBTyxFQUFFO1FBQ1gsSUFBSTtZQUNGLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7UUFBQyxPQUFPLEdBQVEsRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sS0FBSSxHQUFHLENBQUMsQ0FBQztTQUM1RTtLQUNGO0lBRUQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBekJELGdEQXlCQztBQUVELEtBQUssVUFBVSxjQUFjLENBQUMsSUFBWSxFQUFFLElBQVM7O0lBQ25ELElBQ0UsSUFBSSxLQUFLLEdBQUcsQ0FBQyxnQkFBZ0I7UUFDN0IsQ0FBQSxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLE1BQU0sTUFBSyxHQUFHLENBQUMseUJBQXlCO1FBQ25ELENBQUEsTUFBQSxJQUFJLENBQUMsSUFBSSwwQ0FBRSxNQUFNLE1BQUssR0FBRyxDQUFDLHdCQUF3QjtRQUVsRCxPQUFPO0lBRVQsTUFBTSxVQUFVLEdBQVcsQ0FBQSxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLFVBQVUsTUFBSSxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLFVBQVUsQ0FBQSxDQUFDO0lBQzFFLE1BQU0sU0FBRyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IHNpZ25hdHVyZUlzVmFsaWQgfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aGVudGljYXRpb25cIjtcbmltcG9ydCB7IEVudiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9lbnZcIjtcbmltcG9ydCAqIGFzIENOVCBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbnR5cGUgRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBzdHJpbmcsIGJvZHk6IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcblxuY29uc3QgZXZlbnRNYXA6IFJlY29yZDxzdHJpbmcsIEV2ZW50SGFuZGxlcj4gPSB7fTtcblxuZXZlbnRNYXBbQ05ULlRSQU5TRkVSX0NSRUFURURdID0gaGFuZGxlVHJhbnNmZXI7XG5ldmVudE1hcFtDTlQuVFJBTlNGRVJfVVBEQVRFRF0gPSBoYW5kbGVUcmFuc2ZlcjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVdlYmhvb2tFdmVudChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFzaWduYXR1cmVJc1ZhbGlkKHJlcS5oZWFkZXJzKSkge1xuICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICBbXCJ4LXRpbWVzdGFtcFwiLCBcIngtbm9uY2VcIiwgXCJ4LXdlYmhvb2staWRcIiwgXCJ4LXNpZ25hdHVyZVwiXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGhlYWRlcnNba2V5XSA9IChyZXEuaGVhZGVyc1trZXldIGFzIHN0cmluZykgfHwgXCJcIjtcbiAgICB9KTtcbiAgICBjb25zb2xlLndhcm4oYGhhbmRsZVdlYmhvb2tFdmVudDogaW52YWxpZCBzaWduYXR1cmU6IGhlYWRlcnM6YCwgaGVhZGVycyk7XG4gICAgcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zb2xlLmxvZyhgaGFuZGxlV2ViaG9va0V2ZW50OiBgLCByZXEuYm9keSk7XG5cbiAgY29uc3QgZXZlbnQ6IHN0cmluZyA9IHJlcS5ib2R5LnR5cGU7XG4gIGNvbnN0IGhhbmRsZXIgPSBldmVudE1hcFtldmVudF07XG5cbiAgaWYgKGhhbmRsZXIpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgaGFuZGxlcihldmVudCwgcmVxLmJvZHkpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiaGFuZGxlV2ViaG9va0V2ZW50OiBoYW5kbGVyIGZhaWxlZDogXCIsIGVycj8ubWVzc2FnZSB8fCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVRyYW5zZmVyKHR5cGU6IHN0cmluZywgYm9keTogYW55KSB7XG4gIGlmIChcbiAgICB0eXBlID09PSBDTlQuVFJBTlNGRVJfVVBEQVRFRCAmJlxuICAgIGJvZHkuZGF0YT8uc3RhdHVzICE9PSBDTlQuVFJBTlNGRVJfU1RBVFVTX0NPTVBMRVRFRCAmJlxuICAgIGJvZHkuZGF0YT8uc3RhdHVzICE9PSBDTlQuVFJBTlNGRVJfU1RBVFVTX1JFVkVSU0VEIFxuICApXG4gICAgcmV0dXJuO1xuXG4gIGNvbnN0IHRyYW5zZmVySUQ6IHN0cmluZyA9IGJvZHkuZGF0YT8udHJhbnNmZXJJRCB8fCBib2R5LmRhdGE/LlRyYW5zZmVySUQ7XG4gIGF3YWl0IEVudi5TbGFja1NlcnZpY2Uuc2VuZFRyYW5zZmVyTWVzc2FnZSh0eXBlLCB0cmFuc2ZlcklEKTtcbn1cbiJdfQ==