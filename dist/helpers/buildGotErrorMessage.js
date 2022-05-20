"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildGotErrorMessage(err) {
    var _a;
    if (!err)
        return "(no error information)";
    const msg = [];
    if ((_a = err.request) === null || _a === void 0 ? void 0 : _a.requestUrl) {
        msg.push(err.request.requestUrl);
    }
    msg.push(err.code);
    if (err.response) {
        msg.push(err.response.statusCode);
        if (err.response.body) {
            msg.push(JSON.stringify(err.response.body));
        }
    }
    return msg.join(" ");
}
exports.default = buildGotErrorMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRHb3RFcnJvck1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9idWlsZEdvdEVycm9yTWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQXdCLG9CQUFvQixDQUFDLEdBQVM7O0lBQ3BELElBQUksQ0FBQyxHQUFHO1FBQUUsT0FBTyx3QkFBd0IsQ0FBQztJQUUxQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixJQUFJLE1BQUEsR0FBRyxDQUFDLE9BQU8sMENBQUUsVUFBVSxFQUFFO1FBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNsQztJQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQWhCRCx1Q0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0RXJyb3IgfSBmcm9tIFwiZ290XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkR290RXJyb3JNZXNzYWdlKGVycj86IGFueSk6IHN0cmluZyB7XG4gIGlmICghZXJyKSByZXR1cm4gXCIobm8gZXJyb3IgaW5mb3JtYXRpb24pXCI7XG5cbiAgY29uc3QgbXNnID0gW107XG4gIGlmIChlcnIucmVxdWVzdD8ucmVxdWVzdFVybCkge1xuICAgIG1zZy5wdXNoKGVyci5yZXF1ZXN0LnJlcXVlc3RVcmwpO1xuICB9XG4gIG1zZy5wdXNoKGVyci5jb2RlKTtcbiAgaWYgKGVyci5yZXNwb25zZSkge1xuICAgIG1zZy5wdXNoKGVyci5yZXNwb25zZS5zdGF0dXNDb2RlKTtcbiAgICBpZiAoZXJyLnJlc3BvbnNlLmJvZHkpIHtcbiAgICAgIG1zZy5wdXNoKEpTT04uc3RyaW5naWZ5KGVyci5yZXNwb25zZS5ib2R5KSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1zZy5qb2luKFwiIFwiKTtcbn1cbiJdfQ==