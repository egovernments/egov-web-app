"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translate = translate;
exports.validate_fileupload = validate_fileupload;
exports.format_lat_long = format_lat_long;
exports.toLocalTime = toLocalTime;
exports.epochToDate = epochToDate;
exports.epochToTime = epochToTime;
exports.dateToEpoch = dateToEpoch;
exports.dataURItoBlob = dataURItoBlob;
function translate(locale_text) {
  // if (locale_text && localStorage.getItem(`localization_${localStorage.getItem("locale")}`)) {
  //   var langresult = JSON.parse(localStorage.getItem(`localization_${localStorage.getItem("locale")}`)).filter(function(obj) {
  //     return obj.code == locale_text;
  //   });
  //   if (langresult[0]) return Object.values(langresult[0])[1];
  //   else return localStorage.locale == 'mr_IN' ? localization_MR_Data[locale_text] || locale_text : localization_EN_Data[locale_text] || locale_text;
  // }
  return locale_text;
}

function validate_fileupload(files, formats) {
  var filelimit = 5242880;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filename = file.name;
    var fileext = filename.split(".").pop().toLowerCase();
    var filesize = file.size;
    if (filename.length <= 30) {
      if (formats.indexOf(fileext) >= 0 || !formats || formats.length == 0) {
        if (filesize <= filelimit) {} else {
          return "File size exceeds 5MB";
        }
      } else {
        return "Allowed file formats is " + formats + "";
      }
    } else {
      return "File name length should not exceed 30 characters";
    }
  }
  return true;
}

function format_lat_long(latorlong) {
  var loc_arry = latorlong.split(",");
  var degree = parseFloat(loc_arry[0]);
  var minutes = parseFloat(loc_arry[1]);
  var seconds = parseFloat(loc_arry[2]);

  //formula is degree+((minutes*60)+seconds/3600)
  var formatted = degree + (minutes * 60 + seconds) / 3600;

  return formatted;
}

function toLocalTime(regDate) {
  var dat = regDate.split(" ")[0];
  dat = dat.split("-")[1] + "-" + dat.split("-")[0] + "-" + dat.split("-")[2] + " " + regDate.split(" ")[1];
  dat = new Date(dat + " UTC").toString();
  return dat.substr(0, dat.indexOf("GMT"));
}

function epochToDate(t) {
  function pad2(n) {
    return n > 9 ? n : "0" + n;
  }
  var d = new Date(Number(t));
  var year = d.getFullYear();
  var month = d.getMonth() + 1; // months start at zero
  var day = d.getDate();

  return pad2(day) + "/" + pad2(month) + "/" + year;
}

function epochToTime(t) {
  var date_obj = new Date(Number(t));
  var hrs = date_obj.getHours();
  var mins = date_obj.getMinutes();
  var time = (hrs < 10 ? "0" + hrs : hrs) + ":" + (mins < 10 ? "0" + mins : mins);
  return time;
}

function dateToEpoch(datestring) {
  var tdate = datestring.split("/");
  return new Date(tdate[2], tdate[1] - 1, tdate[0]).getTime();
}

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0) byteString = atob(dataURI.split(",")[1]);else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {
    type: mimeString
  });
}