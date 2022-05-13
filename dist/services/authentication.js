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
exports.generateSignature = exports.signatureIsValid = void 0;
const crypto = __importStar(require("crypto"));
const configuration_1 = require("../configuration");
function signatureIsValid(headers) {
    const config = (0, configuration_1.active)();
    const timestamp = headers["x-timestamp"];
    const nonce = headers["x-nonce"];
    const webhookID = headers["x-webhook-id"];
    const signature = headers["x-signature"];
    const payload = `${timestamp}|${nonce}|${webhookID}`;
    const checkHash = crypto
        .createHmac("sha512", config.moov.webhookSecret)
        .update(payload)
        .digest("hex");
    return signature === checkHash;
}
exports.signatureIsValid = signatureIsValid;
function generateSignature(timestamp, nonce, webhookID) {
    const config = (0, configuration_1.active)();
    const payload = `${timestamp}|${nonce}|${webhookID}`;
    const signature = crypto
        .createHmac("sha512", config.moov.webhookSecret)
        .update(payload)
        .digest("hex");
    return signature;
}
exports.generateSignature = generateSignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUdqQyxvREFBdUQ7QUFFdkQsU0FBZ0IsZ0JBQWdCLENBQUMsT0FBNEI7SUFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBUyxHQUFFLENBQUM7SUFDM0IsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sT0FBTyxHQUFHLEdBQUcsU0FBUyxJQUFJLEtBQUssSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUVyRCxNQUFNLFNBQVMsR0FBRyxNQUFNO1NBQ3JCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVqQixPQUFPLFNBQVMsS0FBSyxTQUFTLENBQUM7QUFDakMsQ0FBQztBQWRELDRDQWNDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsU0FBaUIsRUFBRSxLQUFhLEVBQUUsU0FBaUI7SUFDbkYsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBUyxHQUFFLENBQUM7SUFDM0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU07U0FDckIsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFWRCw4Q0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XG5pbXBvcnQgeyBJbmNvbWluZ0h0dHBIZWFkZXJzIH0gZnJvbSBcImh0dHBcIjtcblxuaW1wb3J0IHsgYWN0aXZlIGFzIGdldENvbmZpZyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaWduYXR1cmVJc1ZhbGlkKGhlYWRlcnM6IEluY29taW5nSHR0cEhlYWRlcnMpOiBib29sZWFuIHtcbiAgY29uc3QgY29uZmlnID0gZ2V0Q29uZmlnKCk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGhlYWRlcnNbXCJ4LXRpbWVzdGFtcFwiXTtcbiAgY29uc3Qgbm9uY2UgPSBoZWFkZXJzW1wieC1ub25jZVwiXTtcbiAgY29uc3Qgd2ViaG9va0lEID0gaGVhZGVyc1tcIngtd2ViaG9vay1pZFwiXTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gaGVhZGVyc1tcIngtc2lnbmF0dXJlXCJdO1xuICBjb25zdCBwYXlsb2FkID0gYCR7dGltZXN0YW1wfXwke25vbmNlfXwke3dlYmhvb2tJRH1gO1xuXG4gIGNvbnN0IGNoZWNrSGFzaCA9IGNyeXB0b1xuICAgIC5jcmVhdGVIbWFjKFwic2hhNTEyXCIsIGNvbmZpZy5tb292LndlYmhvb2tTZWNyZXQpXG4gICAgLnVwZGF0ZShwYXlsb2FkKVxuICAgIC5kaWdlc3QoXCJoZXhcIik7XG5cbiAgcmV0dXJuIHNpZ25hdHVyZSA9PT0gY2hlY2tIYXNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTaWduYXR1cmUodGltZXN0YW1wOiBzdHJpbmcsIG5vbmNlOiBzdHJpbmcsIHdlYmhvb2tJRDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgY29uZmlnID0gZ2V0Q29uZmlnKCk7XG4gIGNvbnN0IHBheWxvYWQgPSBgJHt0aW1lc3RhbXB9fCR7bm9uY2V9fCR7d2ViaG9va0lEfWA7XG5cbiAgY29uc3Qgc2lnbmF0dXJlID0gY3J5cHRvXG4gICAgLmNyZWF0ZUhtYWMoXCJzaGE1MTJcIiwgY29uZmlnLm1vb3Yud2ViaG9va1NlY3JldClcbiAgICAudXBkYXRlKHBheWxvYWQpXG4gICAgLmRpZ2VzdChcImhleFwiKTtcblxuICByZXR1cm4gc2lnbmF0dXJlO1xufVxuIl19