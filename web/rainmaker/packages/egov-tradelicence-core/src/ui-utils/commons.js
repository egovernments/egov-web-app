import isEmpty from "lodash/isEmpty";

export const addComponentJsonpath=(components,jsonPath="components")=>
{
  for (var componentKey in components) {
    if (components.hasOwnProperty(componentKey)) {
      if (components[componentKey].children) {
        components[componentKey].componentJsonpath=`${jsonPath}.${componentKey}`;
        const childJsonpath=`${components[componentKey].componentJsonpath}.children`;
        addComponentJsonpath(components[componentKey].children,childJsonpath);
      }
      else {
        components[componentKey].componentJsonpath=`${jsonPath}.${componentKey}`;
      }
    }
  }
  return components;
}


export const getQueryArg = (url, name) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const addQueryArg = (url, queries = []) => {
  const urlParts = url.split("?");
  const path = urlParts[0];
  let queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach((query) => {
    const key = query.key;
    const value = query.value;
    const newQuery = `${key}=${value}`;
    queryParts.push(newQuery);
  });
  const newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

export const isFieldEmpty = (field) => {
  if (field === undefined || field === null) {
    return true;
  }
  if (typeof field !== "object") {
    field = field.toString().trim();
    return isEmpty(field);
  }
  return false;
};

export const slugify = (term) => {
  return term.toLowerCase().replace(/\s+/, "-");
};

export const persistInLocalStorage = (obj) => {
  Object.keys(obj).forEach((objKey) => {
    const objValue = obj[objKey];
    window.localStorage.setItem(objKey, objValue);
  }, this);
};

export const fetchFromLocalStorage = (key) => {
  return window.localStorage.getItem(key) || null;
};

export const trimObj = (obj) => {
  if (!Array.isArray(obj) && typeof obj !== "object") return obj;
  for (var key in obj) {
    obj[key.trim()] = typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

export const getDateInEpoch=()=>{
  return new Date().getTime();
}
