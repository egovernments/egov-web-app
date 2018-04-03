import set from "lodash/set";
import isEmpty from "lodash/isEmpty";

export const statusToMessageMapping = {
  rejected: "Rejected",
  closed: "Closed",
  open: "Opened",
  "re-assign": "Re-assigned",
  assigned: "Assigned"
};

export const displayStatus = (status) => {
  return status ? statusToMessageMapping[status.toLowerCase()] : "";
};


export const transformById = (payload, id) => {
  return payload.reduce((result, item) => {
    result[item[id]] = {
      ...item,
    };
    return result;
  }, {});
};

export const hyphenSeperatedDateTime = (d) => {
  return d;
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

export const getRequestUrl = (url, params) => {
  let query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  return url + "?" + query;
};

export const prepareForm = (params) => {
  let formData = new FormData();
  for (var k in params) {
    formData.append(k, params[k]);
  }
  return formData;
};

const getMonthName = (monthIndex) => {
  switch (monthIndex) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
  }
};

export const mapCompIDToName = (IDObj, compID) => {
  return IDObj[compID] ? IDObj[compID].serviceName : "Default";
};

export const getDateFromEpoch = (epoch) => {
  const dateObj = new Date(epoch);
  const year = dateObj
    .getFullYear()
    .toString()
    .slice(2, 4);
  const month = getMonthName(dateObj.getMonth() + 1);
  const day = dateObj.getDate();
  return day + "-" + month + "-" + year;
};

export const getBodyClassFromPath = (path) => {
  let bodyClass = path
    .split("/")
    .filter((part) => part.trim().length > 0)
    .join("-");
  return bodyClass;
};

export const addBodyClass = (path) => {
  const bodyClass = getBodyClassFromPath(path);
  document.body.classList.add(bodyClass);
};

export const removeBodyClass = (path) => {
  const bodyClass = getBodyClassFromPath(path);
  document.body.classList.remove(bodyClass);
};

export const prepareFormData = (form) => {
  const formFields = form.fields;
  return Object.keys(formFields).reduce((formData, fieldKey) => {
    const { file, jsonPath } = formFields[fieldKey];
    let { value } = formFields[fieldKey];
    if (file) {
      value = ((form.files && form.files[fieldKey]) || []).map((fieldFile) => fieldFile.fileStoreId);
    }
    return set(formData, jsonPath, value);
  }, {});
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && typeof translatedLabel === "object" && translatedLabel.hasOwnProperty("message"))
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const getImageUrlByFile = (file) => {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

export const getUserInfo = () => {
  let userInfo = localStorage.getItem("user-info");
  try {
    userInfo = JSON.parse(userInfo);
  } catch (error) {
    userInfo = null;
  }
  return userInfo;
};
