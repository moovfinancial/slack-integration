"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const moov_1 = require("./moov");
const slack_1 = require("./slack");
class Environment {
    constructor() {
        this.MoovService = new moov_1.MoovService();
        this.SlackService = new slack_1.SlackService();
    }
}
exports.Env = new Environment();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2Vudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBbUQ7QUFDbkQsbUNBQXNEO0FBRXRELE1BQU0sV0FBVztJQUFqQjtRQUNFLGdCQUFXLEdBQWlCLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQzlDLGlCQUFZLEdBQWtCLElBQUksb0JBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7Q0FBQTtBQUVVLFFBQUEsR0FBRyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTW9vdlNlcnZpY2UsIE1vb3ZTZXJ2aWNlIH0gZnJvbSBcIi4vbW9vdlwiO1xuaW1wb3J0IHsgSVNsYWNrU2VydmljZSwgU2xhY2tTZXJ2aWNlIH0gZnJvbSBcIi4vc2xhY2tcIjtcblxuY2xhc3MgRW52aXJvbm1lbnQge1xuICBNb292U2VydmljZTogSU1vb3ZTZXJ2aWNlID0gbmV3IE1vb3ZTZXJ2aWNlKCk7XG4gIFNsYWNrU2VydmljZTogSVNsYWNrU2VydmljZSA9IG5ldyBTbGFja1NlcnZpY2UoKTtcbn1cblxuZXhwb3J0IGxldCBFbnYgPSBuZXcgRW52aXJvbm1lbnQoKTtcbiJdfQ==