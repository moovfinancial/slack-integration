"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEnvVar = void 0;
function requireEnvVar(name) {
    const variable = process.env[name];
    if (!variable) {
        console.error(`${name} environment variable is required`);
        process.exit(1);
    }
    return variable;
}
exports.requireEnvVar = requireEnvVar;
