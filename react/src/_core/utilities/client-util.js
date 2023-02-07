const isEmptyObject = (obj) => {
  return obj && (Object.keys(obj).length === 0) && (Object.getPrototypeOf(obj) === Object.prototype);
};

const Client_Util = {
  getValue: (name, data) => {
    if (!isEmptyObject(data)) {
      if (data.hasOwnProperty(name)) {
        return (data[name] || "");
      }
      return "";
    } else {
      console.log('Not an object.');
    }
  }
};

export default Client_Util;