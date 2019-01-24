import isEmpty from "lodash/isEmpty";
import { httpRequest } from "../ui-utils/api";
import cloneDeep from "lodash/cloneDeep";

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

export const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      result[item[id]] = {
        ...item
      };

      return result;
    }, {})
  );
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (
      translatedLabel &&
      typeof translatedLabel === "object" &&
      translatedLabel.hasOwnProperty("message")
    )
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const epochToYmd = et => {
  // Return null if et already null
  if (!et) return null;
  // Return the same format if et is already a string (boundary case)
  if (typeof et === "string") return et;
  let date = new Date(et);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  // date = `${date.getFullYear()}-${month}-${day}`;
  var formatted_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + day;
  return formatted_date;
};

export const getLocaleLabels = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const replaceStrInPath = (inputString, search, replacement) => {
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };
  return inputString.replaceAll(search, replacement);
};

export const getFileUrlFromAPI = async fileStoreId => {
  const queryObject = [
    { key: "tenantId", value: "pb" },
    { key: "fileStoreIds", value: fileStoreId }
  ];
  try {
    const fileUrl = await httpRequest(
      "get",
      "/filestore/v1/files/url",
      "",
      queryObject
    );
    return fileUrl;
  } catch (e) {
    console.log(e);
  }
};

const getAllFileStoreIds = async ProcessInstances => {
  return (
    ProcessInstances &&
    ProcessInstances.reduce((result, eachInstance) => {
      if (eachInstance.documents) {
        let fileStoreIdArr = eachInstance.documents.map(item => {
          return item.fileStoreId;
        });
        result[eachInstance.id] = fileStoreIdArr.join(",");
      }
      return result;
    }, {})
  );
};

export const addWflowFileUrl = async ProcessInstances => {
  const fileStoreIdByAction = await getAllFileStoreIds(ProcessInstances);
  const fileUrlPayload = await getFileUrlFromAPI(
    Object.values(fileStoreIdByAction).join(",")
  );
  const processInstances = cloneDeep(ProcessInstances);
  processInstances.map(item => {
    if (item.documents && item.documents.length > 0) {
      item.documents.forEach(i => {
        i.link = fileUrlPayload[i.fileStoreId];
        i.title = i.documentType;
        i.name = decodeURIComponent(
          fileUrlPayload[i.fileStoreId]
            .split(",")[0]
            .split("?")[0]
            .split("/")
            .pop()
            .slice(13)
        );
        i.linkText = "View";
      });
    }
  });
  //setProcessInstances(processInstances);

  localStorage.setItem("ProcessInstances", JSON.stringify(processInstances));
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
  let uploadDocument = true;
  const { inputProps, maxFileSize, moduleName } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        alert(`Only image or pdf files can be uploaded`);
        uploadDocument = false;
      }
      if (!isSizeValid) {
        alert(`Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`);
        uploadDocument = false;
      }
      if (uploadDocument) {
        if (file.type.match(/^image\//)) {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            "pb"
          );
          handleDocument(file, fileStoreId);
        } else {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            "pb"
          );
          handleDocument(file, fileStoreId);
        }
      }
    });
  }
};
