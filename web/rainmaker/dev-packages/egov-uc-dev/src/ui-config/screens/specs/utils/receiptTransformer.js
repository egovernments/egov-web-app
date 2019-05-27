import get from "lodash/get";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "../../../../ui-redux/store";
import {
  getMdmsData,
  getReceiptData,
  getSearchResults,
  getUserDataFromUuid,
  getFinancialYearDates
} from "../utils";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";

const ifNotNull = value => {
  return !["", "NA", "null", null].includes(value);
};

const nullToNa = value => {
  return ["", "NA", "null", null].includes(value) ? "NA" : value;
};

// const createAddress = (doorNo, buildingName, street, locality, city) => {
//   let address = "";
//   address += ifNotNull(doorNo) ? doorNo + ", " : "";
//   address += ifNotNull(buildingName) ? buildingName + ", " : "";
//   address += ifNotNull(street) ? street + ", " : "";
//   address += locality + ", ";
//   address += city;
//   return address;
// };

const epochToDate = et => {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
};

// const getMessageFromLocalization = code => {
//   let messageObject = JSON.parse(getLocalization("localization_en_IN")).find(
//     item => {
//       return item.code == "UC_" + code;
//     }
//   );
//   return messageObject ? messageObject.message : code;
// };

export const loadUlbLogo = tenantid => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    store.dispatch(prepareFinalObject("base64UlbLogo", canvas.toDataURL()));
    canvas = null;
  };
  img.src = `/pb-egov-assets/${tenantid}/logo.png`;
};

// export const loadApplicationData = async (applicationNumber, tenant) => {
//   let data = {};
//   let queryObject = [
//     { key: "tenantId", value: tenant },
//     { key: "applicationNumber", value: applicationNumber }
//   ];
//   let response = await getSearchResults(queryObject);

//   if (response && response.Licenses && response.Licenses.length > 0) {
//     data.applicationNumber = nullToNa(
//       get(response, "Licenses[0].applicationNumber", "NA")
//     );
//     data.oldLicenseNumber = nullToNa(
//       get(response, "Licenses[0].oldLicenseNumber", "NA")
//     );
//     data.applicationType = getMessageFromLocalization(
//       nullToNa(
//         get(
//           response,
//           "Licenses[0].tradeLicenseDetail.additionalDetail.applicationType",
//           "NA"
//         )
//       )
//     );
//     data.licenseNumber = nullToNa(
//       get(response, "Licenses[0].licenseNumber", "NA")
//     );
//     data.financialYear = nullToNa(
//       get(response, "Licenses[0].financialYear", "NA")
//     );
//     data.tradeName = nullToNa(get(response, "Licenses[0].tradeName", "NA"));
//     data.doorNo = nullToNa(
//       get(response, "Licenses[0].tradeLicenseDetail.address.doorNo", "NA")
//     );
//     data.buildingName = nullToNa(
//       get(response, "Licenses[0].tradeLicenseDetail.address.buildingName", "NA")
//     );
//     data.streetName = nullToNa(
//       get(response, "Licenses[0].tradeLicenseDetail.address.street", "NA")
//     );
//     data.locality = get(
//       response,
//       "Licenses[0].tradeLicenseDetail.address.locality.name",
//       "NA"
//     );
//     let cityCode = nullToNa(
//       get(response, "Licenses[0].tradeLicenseDetail.address.tenantId", "NA")
//     );
//     data.city = getMessageFromLocalization(cityCode);
//     /** Make owners data array */
//     let ownersData = get(response, "Licenses[0].tradeLicenseDetail.owners", []);
//     data.owners = ownersData.map(owner => {
//       return {
//         name: get(owner, "name", "NA"),
//         mobile: get(owner, "mobileNumber", "NA")
//       };
//     });
//     data.ownersList = ownersData
//       .map(owner => {
//         return get(owner, "name", "NA");
//       })
//       .join(", ");
//     /** End */
//     let licenseIssueDate = get(response, "Licenses[0].issuedDate", "NA");
//     data.licenseIssueDate = nullToNa(epochToDate(licenseIssueDate));
//     data.licenseExpiryDate = nullToNa(
//       epochToDate(get(response, "Licenses[0].validTo", "NA"))
//     );
//     let licenseValidTo = get(response, "Licenses[0].validTo", "NA");
//     data.licenseValidity = getFinancialYearDates("dd/mm/yyyy", licenseValidTo);
//     /** Trade settings */
//     const tradeUnitsFromResponse = get(
//       response,
//       "Licenses[0].tradeLicenseDetail.tradeUnits",
//       null
//     );

//     const transformedTradeData = tradeUnitsFromResponse.reduce(
//       (res, curr) => {
//         let tradeCategory = "NA";
//         let tradeType = "NA";
//         let tradeSubType = "NA";
//         let tradeCode = curr.tradeType;
//         if (tradeCode) {
//           let tradeCodeArray = tradeCode.split(".");
//           if (tradeCodeArray.length == 1) {
//             tradeCategory = nullToNa(tradeCode);
//           } else if (tradeCodeArray.length == 2) {
//             tradeCategory = nullToNa(tradeCodeArray[0]);
//             tradeType = nullToNa(tradeCode);
//           } else if (tradeCodeArray.length > 2) {
//             tradeCategory = nullToNa(tradeCodeArray[0]);
//             tradeType = nullToNa(tradeCodeArray[1]);
//             tradeSubType = nullToNa(tradeCode);
//           }
//         }
//         /** End */

//         res.tradeCategory.push(getMessageFromLocalization(tradeCategory));

//         res.tradeTypeReceipt.push(
//           getMessageFromLocalization(tradeType) +
//             " / " +
//             getMessageFromLocalization(tradeSubType)
//         );
//         res.tradeTypeCertificate.push(
//           getMessageFromLocalization(tradeCategory) +
//             " / " +
//             getMessageFromLocalization(tradeType) +
//             " / " +
//             getMessageFromLocalization(tradeSubType)
//         );
//         return res;
//       },
//       {
//         tradeCategory: [],
//         tradeTypeReceipt: [],
//         tradeTypeCertificate: []
//       }
//     );

//     data.tradeCategory = transformedTradeData.tradeCategory.join(", ");
//     data.tradeTypeReceipt = transformedTradeData.tradeTypeReceipt.join(", ");
//     data.tradeTypeCertificate = transformedTradeData.tradeTypeCertificate.join(
//       ", "
//     );
//     data.address = nullToNa(
//       createAddress(
//         data.doorNo,
//         data.buildingName,
//         data.streetName,
//         data.locality,
//         data.city
//       )
//     );
//     let accessories = response.Licenses[0].tradeLicenseDetail.accessories
//       ? response.Licenses[0].tradeLicenseDetail.accessories.length
//       : 0;
//     data.accessories = nullToNa(accessories);
//     if (accessories > 0) {
//       data.accessoriesList = response.Licenses[0].tradeLicenseDetail.accessories
//         .map(item => {
//           return getMessageFromLocalization(item.accessoryCategory);
//         })
//         .reduce((pre, cur) => {
//           return pre.concat(", " + cur);
//         });
//     } else {
//       data.accessoriesList = "";
//     }
//     loadUserNameData(response.Licenses[0].auditDetails.lastModifiedBy);
//   }
//   store.dispatch(prepareFinalObject("applicationDataForReceipt", data));
// };

export const loadReceiptData = async (consumerCode, tenant) => {
  let data = {};
  let queryObject = [
    {
      key: "tenantId",
      value: tenant
    },
    {
      key: "consumerCode",
      value: consumerCode
    }
  ];
  let response = await getReceiptData(queryObject);

  if (response && response.Receipt && response.Receipt.length > 0) {
    data.ReceiptDate = epochToDate(
      get(response,"Receipt[0].Bill[0].billDetails[0].receiptDate")
      );
     const fromDate = epochToDate(
      get(response, "Receipt[0].Bill[0].billDetails[0].fromPeriod")
    );
     const toDate = epochToDate(
      get(response, "Receipt[0].Bill[0].billDetails[0].toPeriod")
    );
    data.taxperiod = fromDate + "-" + toDate 
    data.consumerName = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].payerName"
    );
    data.mobileNumber = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].mobileNumber"
    );
    data.serviceCategory = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].businessService"
    ).split(".")[0]
     const serviceType = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].businessService",
      "None"
    ).split(".")[1]
    data.serviceType =serviceType && serviceType
    data.amountPaid = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].amountPaid",
      0
    );
    data.totalAmount = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].totalAmount",
      0
    );
    data.amountDue = data.totalAmount - data.amountPaid;
    data.paymentMode = nullToNa(
      get(response, "Receipt[0].instrument.instrumentType.name", "NA")
    );
    data.g8ReceiptNo = nullToNa(
      get(
        response,
        "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber",
        "None"
      )
    );
  }
  store.dispatch(prepareFinalObject("receiptDataForReceipt", data));
};

export const loadMdmsData = async tenantid => {
  let data = {};
  let queryObject = [
    {
      key: "tenantId",
      value: `${tenantid}`
    },
    {
      key: "moduleName",
      value: "tenant"
    },
    {
      key: "masterName",
      value: "tenants"
    }
  ];
  let response = await getMdmsData(queryObject);

  if (
    response &&
    response.MdmsRes &&
    response.MdmsRes.tenant.tenants.length > 0
  ) {
    let ulbData = response.MdmsRes.tenant.tenants.find(item => {
      return item.code == tenantid;
    });
    /** START Corporation name generation logic */
    let ulbGrade = get(ulbData, "city.ulbGrade", "NA");
    let name = get(ulbData, "city.name", "NA");
    if (ulbGrade) {
      if (ulbGrade === "NP") {
        data.corporationName = `${name.toUpperCase()} NAGAR PANCHAYAT`;
      } else if (ulbGrade === "Municipal Corporation") {
        data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
      } else if (ulbGrade.includes("MC Class")) {
        data.corporationName = `${name.toUpperCase()} MUNICIPAL COUNCIL`;
      } else {
        data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
      }
    } else {
      data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
    }
    /** END */
    data.corporationAddress = get(ulbData, "address", "NA");
    data.corporationContact = get(ulbData, "contactNumber", "NA");
    data.corporationWebsite = get(ulbData, "domainUrl", "NA");
    data.corporationEmail = get(ulbData, "emailId", "NA");
  }
  store.dispatch(prepareFinalObject("mdmsDataForReceipt", data));
};

/** Data used for creation of receipt is generated and stored in local storage here */
export const loadReceiptGenerationData = (applicationNumber, tenant) => {
  /** Logo loaded and stored in local storage in base64 */
  // loadUlbLogo(tenant); //pb.amritsar
  // loadApplicationData(applicationNumber, tenant); //PB-TL-2018-09-27-000004
  loadReceiptData(applicationNumber, tenant); //PT-107-001330:AS-2018-08-29-001426     //PT consumerCode
  loadMdmsData(tenant);
};
