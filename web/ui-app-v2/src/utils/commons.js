import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import commonConfig from "config/common";

export const statusToMessageMapping = {
  rejected: "Rejected",
  closed: "Closed",
  open: "Opened",
  "re-assign": "Re-assigned",
  assigned: "Assigned",
  resolved: "Resolved",
  reassignrequested: "Re-assign Requested",
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

const getCurrLocation = () => {
  let currLoc = {};
  return new Promise((resolve) => {
    if (localStorage.location) {
      try {
        currLoc = JSON.parse(localStorage.location);
        resolve(currLoc);
      } catch (error) {
        currLoc = {};
      }
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        currLoc.lat = position.coords.latitude.toFixed(6);
        currLoc.lng = position.coords.longitude.toFixed(6);
        resolve(currLoc);
      });
    }
  });
};

export const getCurrentAddress = async () => {
  var currLoc = await getCurrLocation();
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currLoc.lat},${currLoc.lng}&key=${commonConfig.MAP_API_KEY}`;
  try {
    return axios.get(url).then((res) => {
      if (res.data.status === "OK") {
        if (res.data.results[0]) {
          var currAddress = {};
          currAddress.lat = currLoc.lat;
          currAddress.lng = currLoc.lng;
          currAddress.address = res.data.results[0].formatted_address;
          return currAddress;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const mapCompIDToName = (IDObj, compID) => {
  return IDObj[compID] ? IDObj[compID].serviceCode : "Default";
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
  // remove the previous tokens; temp fix
  document.body.classList.forEach((className) => document.body.classList.remove(className));
  bodyClass && document.body.classList.add(bodyClass);
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

export const fetchImages = (actionArray) => {
  let imageArray = [];
  actionArray.forEach((action, index) => {
    action.action==="open" && action.media && imageArray.push(action.media);
  });
  return imageArray[0] ? imageArray[0] : [];
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

export const getCityNameByCode = (code, cities) => {
  const city = (cities || []).filter((city) => city.key === code);
  return (city && city.length && city[0].text) || "";
};

export const isImage = (url) => {
  const acceptedImageTypes = ["jpg", "jpeg", "png"];
  const urlParts = url && url.split("?");
  const imageType = urlParts && urlParts.length && urlParts[0].split(".") && urlParts[0].split(".").length && urlParts[0].split(".").pop();
  return (imageType && acceptedImageTypes.indexOf(imageType) !== -1) || false;
};
