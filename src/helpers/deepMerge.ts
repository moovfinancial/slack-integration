export default function deepMerge(target: any, source: any) {
  const result: any = {};

  const handleMerge = (obj: any) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
          result[key] = deepMerge(result[key], obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
  };

  handleMerge(target);
  handleMerge(source);

  return result;
}
