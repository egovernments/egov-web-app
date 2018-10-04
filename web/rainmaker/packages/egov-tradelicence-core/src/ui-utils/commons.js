import isEmpty from "lodash/isEmpty";
import { uploadFile, httpRequest } from "ui-utils/api";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

export const addComponentJsonpath = (components, jsonPath = "components") => {
  for (var componentKey in components) {
    if (components.hasOwnProperty(componentKey)) {
      if (components[componentKey].children) {
        components[
          componentKey
        ].componentJsonpath = `${jsonPath}.${componentKey}`;
        const childJsonpath = `${
          components[componentKey].componentJsonpath
        }.children`;
        addComponentJsonpath(components[componentKey].children, childJsonpath);
      } else {
        components[
          componentKey
        ].componentJsonpath = `${jsonPath}.${componentKey}`;
      }
    }
  }
  return components;
};

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
  queries.forEach(query => {
    const key = query.key;
    const value = query.value;
    const newQuery = `${key}=${value}`;
    queryParts.push(newQuery);
  });
  const newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

export const isFieldEmpty = field => {
  if (field === undefined || field === null) {
    return true;
  }
  if (typeof field !== "object") {
    field = field.toString().trim();
    return isEmpty(field);
  }
  return false;
};

export const slugify = term => {
  return term.toLowerCase().replace(/\s+/, "-");
};

export const persistInLocalStorage = obj => {
  Object.keys(obj).forEach(objKey => {
    const objValue = obj[objKey];
    window.localStorage.setItem(objKey, objValue);
  }, this);
};

export const fetchFromLocalStorage = key => {
  return window.localStorage.getItem(key) || null;
};

export const trimObj = obj => {
  if (!Array.isArray(obj) && typeof obj !== "object") return obj;
  for (var key in obj) {
    obj[key.trim()] =
      typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

export const getDateInEpoch = () => {
  return new Date().getTime();
};

export const getImageUrlByFile = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

export const getFileSize = file => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

export const isFileValid = (file, acceptedFiles) => {
  const mimeType = file["type"];
  return (
    (mimeType &&
      acceptedFiles &&
      acceptedFiles.indexOf(mimeType.split("/")[1]) > -1) ||
    false
  );
};

export const acceptedFiles = acceptedExt => {
  const splitExtByName = acceptedExt.split(",");
  const acceptedFileTypes = splitExtByName.reduce((result, curr) => {
    if (curr.includes("image")) {
      result.push("image");
    } else {
      result.push(curr.split(".")[1]);
    }
    return result;
  }, []);
  return acceptedFileTypes;
};

export const handleFileUpload = (event, handleDocument, props) => {
  const S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  const { inputProps, maxFileSize } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        alert(`Only image or pdf files can be uploaded`);
        return;
      }
      if (!isSizeValid) {
        alert(`Maximum file size can be ${5} MB`);
        return;
      }
      if (file.type.match(/^image\//)) {
        const imageUri = await getImageUrlByFile(file);
        const fileStoreId = await uploadFile(
          S3_BUCKET.endPoint,
          "rainmaker-pgr",
          file,
          "pb"
        );
        handleDocument(file, fileStoreId);
      } else {
        const fileStoreId = await uploadFile(
          S3_BUCKET.endPoint,
          "RAINMAKER-PGR",
          file,
          "pb"
        );
        handleDocument(file, fileStoreId);
      }
    });
  }
};

export const updateTradeDetails = async requestBody => {
  try {
    const payload = await httpRequest(
      "post",
      "/tl-services/v1/_update",
      "",
      [],
      requestBody
    );
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/tl-services/v1/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updatePFOforSearchResults = async (
  action,
  state,
  dispatch,
  queryValue
) => {
  let queryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: queryValue }
  ];
  const payload = await getSearchResults(queryObject);
  dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
};
