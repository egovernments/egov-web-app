import {
  getReceiptData,
  getSearchResults,
  getMdmsData,
  getUserDataFromUuid
} from "../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import store from "ui-redux/store";
import get from "lodash/get";

const createAddress = (doorNo, buildingName, street, locality) => {
  let address = "";
  address += doorNo !== "" ? doorNo + ", " : "";
  address += buildingName !== "" ? buildingName + ", " : "";
  address += street !== "" ? street + ", " : "";
  address += locality;
  return address;
};

const epochToDate = et => {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate =
    date.getUTCDate() +
    "/" +
    (date.getUTCMonth() + 1) +
    "/" +
    date.getUTCFullYear();
  return formattedDate;
};

const getMessageFromLocalization = code => {
  let messageObject = JSON.parse(
    localStorage.getItem("localization_en_IN")
  ).find(item => {
    return item.code == code;
  });
  return messageObject ? messageObject.message : "NA";
};

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
  img.src = `https://s3.ap-south-1.amazonaws.com/pb-egov-assets/${tenantid}/logo.png`;
};

export const loadApplicationData = async (applicationNumber, tenant) => {
  let data = {};
  let queryObject = [
    { key: "tenantId", value: tenant },
    { key: "applicationNumber", value: applicationNumber }
  ];
  let response = await getSearchResults(queryObject);

  if (response && response.Licenses && response.Licenses.length > 0) {
    data.applicationNumber = get(
      response,
      "Licenses[0].applicationNumber",
      "NA"
    );
    data.licenseNumber = get(response, "Licenses[0].licenseNumber", "NA");
    data.financialYear = get(response, "Licenses[0].financialYear", "NA");
    data.tradeName = get(response, "Licenses[0].tradeName", "NA");
    data.doorNo = get(
      response,
      "Licenses[0].tradeLicenseDetail.address.doorNo",
      "NA"
    );
    data.buildingName = get(
      response,
      "Licenses[0].tradeLicenseDetail.address.buildingName",
      "NA"
    );
    data.streetName = get(
      response,
      "Licenses[0].tradeLicenseDetail.address.street",
      "NA"
    );
    let localityCode = get(
      response,
      "Licenses[0].tradeLicenseDetail.address.locality.code",
      "NA"
    );
    data.locality = getMessageFromLocalization(localityCode);
    data.ownerName = get(
      response,
      "Licenses[0].tradeLicenseDetail.owners[0].name",
      "NA"
    );
    data.mobileNo = get(
      response,
      "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
      "NA"
    );
    data.licenseIssueDate = get(response, "Licenses[0].issuedDate", "NA");
    data.licenseExpiryDate = get(response, "Licenses[0].validTo", "NA");
    /** Trade settings */
    let tradeCategory = "NA";
    let tradeType = "NA";
    let tradeCode = get(
      response,
      "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
      null
    );
    if (tradeCode) {
      let tradeCodeArray = tradeCode.split(".");
      if (tradeCodeArray.length == 1) {
        tradeCategory = "TL_" + tradeCode;
      } else if (tradeCodeArray.length == 2) {
        tradeCategory = "TL_" + tradeCodeArray[0];
        tradeType = "TL_" + tradeCode;
      } else if (tradeCodeArray.length > 2) {
        tradeCategory = "TL_" + tradeCodeArray[0];
        tradeType = "TL_" + tradeCodeArray[1];
      }
    }
    /** End */
    data.tradeCategory = getMessageFromLocalization(tradeCategory);
    data.tradeType = getMessageFromLocalization(tradeType);
    data.address = createAddress(
      data.doorNo,
      data.buildingName,
      data.streetName,
      data.locality
    );
    let accessories = response.Licenses[0].tradeLicenseDetail.accessories
      ? response.Licenses[0].tradeLicenseDetail.accessories.length
      : 0;
    data.accessories = accessories;
    loadUserNameData(response.Licenses[0].auditDetails.lastModifiedBy);
  }
  store.dispatch(prepareFinalObject("applicationDataForReceipt", data));
};

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
    data.receiptNumber = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].receiptNumber",
      "NA"
    );
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
    data.paymentMode = get(
      response,
      "Receipt[0].instrument.instrumentType.name",
      "NA"
    );
    data.transactionNumber = get(
      response,
      "Receipt[0].instrument.transactionNumber",
      "NA"
    );
    data.bankName = get(response, "Receipt[0].instrument.bank.name", "NA");
    data.branchName = get(response, "Receipt[0].instrument.branchName", null);
    data.bankAndBranch =
      data.bankName && data.branchName
        ? data.bankName + ", " + data.branchName
        : get(data, "bankName", "NA");
    data.paymentDate = epochToDate(
      get(response, "Receipt[0].Bill[0].billDetails[0].receiptDate", 0)
    );
    data.g8ReceiptNo = get(
      response,
      "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber",
      "NA"
    );
    data.g8ReceiptDate = epochToDate(
      get(response, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate", 0)
    );
    /** START TL Fee, Adhoc Penalty/Rebate Calculation */
    var tlAdhocPenalty = 0,
      tlAdhocRebate = 0;
    response.Receipt[0].Bill[0].billDetails[0].billAccountDetails.map(item => {
      let desc = item.accountDescription ? item.accountDescription : "";
      if (desc.startsWith("TL_TAX")) {
        data.tlFee = item.crAmountToBePaid;
      } else if (desc.startsWith("TL_ADHOC_PENALTY")) {
        tlAdhocPenalty = item.crAmountToBePaid;
      } else if (desc.startsWith("TL_ADHOC_REBATE")) {
        tlAdhocRebate = item.crAmountToBePaid;
      }
    });
    data.tlAdhocPenaltyRebate = tlAdhocPenalty - tlAdhocRebate;
    /** END */
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

export const loadUserNameData = async uuid => {
  let data = {};
  let bodyObject = {
    uuid: [uuid]
  };
  let response = await getUserDataFromUuid(bodyObject);

  if (response && response.user && response.user.length > 0) {
    data.auditorName = get(response, "user[0].name", "NA");
  }
  store.dispatch(prepareFinalObject("userDataForReceipt", data));
};
