import set from "lodash/set";

export const getNestedObjFormat = (categories) => {
  var categoryList = {};
  Object.values(categories).map((item) => {
    set(categoryList, item.menuPath ? item.menuPath + "." + item.serviceCode : item.serviceCode, item);
  });
  var categoryTypes = transform(categoryList);
  return categoryTypes;
};

const transform = (input) => {
  return Object.keys(input).reduce((result, itemKey) => {
    const item = input[itemKey];
    const nestedItemKeys = Object.keys(item).filter((childItemKey) => typeof item[childItemKey] === "object");
    const nestedItems = nestedItemKeys.map((key) => completeDetails(item[key], key));
    nestedItemKeys.forEach((key) => delete item[key]);
    item.nestedItems = transform(nestedItems, []);
    result.push(completeDetails(item, itemKey));
    return result;
  }, []);
};

const completeDetails = (item, key) => {
  return Object.assign({}, item, {
    id: item.text || key,
    text: item.text || key,
    displayKey: (item.text && "SERVICEDEFS." + item.id.toUpperCase()) || "SERVICEDEFS." + key.toUpperCase(),
    leftIcon: item.text || key.toLowerCase().replace(/\\s+/, "-"),
  });
};
