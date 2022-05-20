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
const app = __importStar(require("./application"));
const configuration = __importStar(require("./configuration"));
(async () => {
    try {
        const config = await configuration.load();
        await app.start(config);
    }
    catch (err) {
        if (err) {
            console.error(err.message || err);
        }
        process.exit(1);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFDO0FBQ3JDLCtEQUFpRDtBQUVqRCxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1YsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6QjtJQUFDLE9BQU8sR0FBUSxFQUFFO1FBQ2pCLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhcHAgZnJvbSBcIi4vYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIGNvbmZpZ3VyYXRpb24gZnJvbSBcIi4vY29uZmlndXJhdGlvblwiO1xuXG4oYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGNvbmZpZ3VyYXRpb24ubG9hZCgpO1xuICAgIGF3YWl0IGFwcC5zdGFydChjb25maWcpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG59KSgpO1xuIl19