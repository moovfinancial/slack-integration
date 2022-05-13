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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBd0IsU0FBUyxDQUFDLE1BQVcsRUFBRSxNQUFXO0lBQ3hELE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUV2QixNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQy9CLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ25CLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssaUJBQWlCLEVBQUU7b0JBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoRDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjthQUNGO1NBQ0Y7SUFDSCxDQUFDLENBQUM7SUFFRixXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFuQkQsNEJBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVlcE1lcmdlKHRhcmdldDogYW55LCBzb3VyY2U6IGFueSkge1xuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gIGNvbnN0IGhhbmRsZU1lcmdlID0gKG9iajogYW55KSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW2tleV0pID09PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2UocmVzdWx0W2tleV0sIG9ialtrZXldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU1lcmdlKHRhcmdldCk7XG4gIGhhbmRsZU1lcmdlKHNvdXJjZSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==