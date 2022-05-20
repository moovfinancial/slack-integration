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
exports.SlackService = void 0;
const application = __importStar(require("../application"));
const configuration = __importStar(require("../configuration"));
const message_1 = require("./message");
const env_1 = require("./env");
class SlackService {
    async sendTransferMessage(type, transferID) {
        try {
            const config = configuration.active();
            const transferData = await env_1.Env.MoovService.getTransferData(transferID);
            const blocks = (0, message_1.transferMessage)(type, transferData);
            const app = application.active();
            await app.client.chat.postMessage({
                channel: config.slack.channel,
                blocks,
            });
        }
        catch (err) {
            console.error(`slack.sendTransferMessage failed: `, (err === null || err === void 0 ? void 0 : err.message) || err);
        }
    }
    async showTransferDetails({ body, client, ack }) {
        try {
            await ack();
            const config = configuration.active();
            const transferData = await env_1.Env.MoovService.getTransferData(body.actions[0].value);
            const view = (0, message_1.transferDetails)(transferData);
            await client.views.open({
                trigger_id: body.trigger_id,
                view,
            });
        }
        catch (err) {
            console.error(`slack.showTransferDetails failed: `, (err === null || err === void 0 ? void 0 : err.message) || err);
        }
    }
}
exports.SlackService = SlackService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc2xhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUE4QztBQUM5QyxnRUFBa0Q7QUFDbEQsdUNBQTZEO0FBQzdELCtCQUE0QjtBQU81QixNQUFhLFlBQVk7SUFDdkIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQVksRUFBRSxVQUFrQjtRQUN4RCxJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RDLE1BQU0sWUFBWSxHQUFHLE1BQU0sU0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkUsTUFBTSxNQUFNLEdBQUcsSUFBQSx5QkFBZSxFQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNuRCxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFakMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2hDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQzdCLE1BQU07YUFDUCxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sR0FBUSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEVBQUUsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsT0FBTyxLQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQztJQUlELEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFPO1FBQ2xELElBQUk7WUFDRixNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRVosTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RDLE1BQU0sWUFBWSxHQUFHLE1BQU0sU0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRixNQUFNLElBQUksR0FBRyxJQUFBLHlCQUFlLEVBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0MsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDdEIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixJQUFJO2FBQ0wsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEdBQVEsRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sS0FBSSxHQUFHLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7Q0FDRjtBQW5DRCxvQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiLi4vYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIGNvbmZpZ3VyYXRpb24gZnJvbSBcIi4uL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IHRyYW5zZmVyRGV0YWlscywgdHJhbnNmZXJNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZVwiO1xuaW1wb3J0IHsgRW52IH0gZnJvbSBcIi4vZW52XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNsYWNrU2VydmljZSB7XG4gIHNlbmRUcmFuc2Zlck1lc3NhZ2UodHlwZTogc3RyaW5nLCB0cmFuc2ZlcklEOiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG4gIHNob3dUcmFuc2ZlckRldGFpbHMoeyBib2R5LCBjbGllbnQsIGFjayB9OiBhbnkpOiBQcm9taXNlPGFueT47XG59XG5cbmV4cG9ydCBjbGFzcyBTbGFja1NlcnZpY2Uge1xuICBhc3luYyBzZW5kVHJhbnNmZXJNZXNzYWdlKHR5cGU6IHN0cmluZywgdHJhbnNmZXJJRDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGNvbmZpZ3VyYXRpb24uYWN0aXZlKCk7XG4gICAgICBjb25zdCB0cmFuc2ZlckRhdGEgPSBhd2FpdCBFbnYuTW9vdlNlcnZpY2UuZ2V0VHJhbnNmZXJEYXRhKHRyYW5zZmVySUQpO1xuICAgICAgY29uc3QgYmxvY2tzID0gdHJhbnNmZXJNZXNzYWdlKHR5cGUsIHRyYW5zZmVyRGF0YSk7XG4gICAgICBjb25zdCBhcHAgPSBhcHBsaWNhdGlvbi5hY3RpdmUoKTtcblxuICAgICAgYXdhaXQgYXBwLmNsaWVudC5jaGF0LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgY2hhbm5lbDogY29uZmlnLnNsYWNrLmNoYW5uZWwsXG4gICAgICAgIGJsb2NrcyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBzbGFjay5zZW5kVHJhbnNmZXJNZXNzYWdlIGZhaWxlZDogYCwgZXJyPy5tZXNzYWdlIHx8IGVycik7XG4gICAgfVxuICB9XG5cblxuXG4gIGFzeW5jIHNob3dUcmFuc2ZlckRldGFpbHMoeyBib2R5LCBjbGllbnQsIGFjayB9OiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYWNrKCk7XG5cbiAgICAgIGNvbnN0IGNvbmZpZyA9IGNvbmZpZ3VyYXRpb24uYWN0aXZlKCk7XG4gICAgICBjb25zdCB0cmFuc2ZlckRhdGEgPSBhd2FpdCBFbnYuTW9vdlNlcnZpY2UuZ2V0VHJhbnNmZXJEYXRhKGJvZHkuYWN0aW9uc1swXS52YWx1ZSk7XG4gICAgICBjb25zdCB2aWV3ID0gdHJhbnNmZXJEZXRhaWxzKHRyYW5zZmVyRGF0YSk7XG5cbiAgICAgIGF3YWl0IGNsaWVudC52aWV3cy5vcGVuKHtcbiAgICAgICAgdHJpZ2dlcl9pZDogYm9keS50cmlnZ2VyX2lkLFxuICAgICAgICB2aWV3LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHNsYWNrLnNob3dUcmFuc2ZlckRldGFpbHMgZmFpbGVkOiBgLCBlcnI/Lm1lc3NhZ2UgfHwgZXJyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==