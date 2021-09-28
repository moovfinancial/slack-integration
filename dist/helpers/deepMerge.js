"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepMerge(target, source) {
    const result = {};
    const handleMerge = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
                    result[key] = deepMerge(result[key], obj[key]);
                }
                else {
                    result[key] = obj[key];
                }
            }
        }
    };
    handleMerge(target);
    handleMerge(source);
    return result;
}
exports.default = deepMerge;
