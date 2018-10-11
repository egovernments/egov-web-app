import get from "lodash/get";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import store from "ui-redux/store";
import {
  getMdmsData,
  getReceiptData,
  getSearchResults,
  getUserDataFromUuid
} from "../utils";

const ifNotNull = value => {
  return !["", "NA", "null", null].includes(value);
};

const nullToNa = value => {
  return ["", "NA", "null", null].includes(value) ? "NA" : value;
};

const createAddress = (doorNo, buildingName, street, locality, city) => {
  let address = "";
  address += ifNotNull(doorNo) ? doorNo + ", " : "";
  address += ifNotNull(buildingName) ? buildingName + ", " : "";
  address += ifNotNull(street) ? street + ", " : "";
  address += locality + ", ";
  address += city;
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
    return item.code == "TL_" + code;
  });
  return messageObject ? messageObject.message : code;
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
    data.applicationNumber = nullToNa(
      get(response, "Licenses[0].applicationNumber", "NA")
    );
    data.licenseNumber = nullToNa(
      get(response, "Licenses[0].licenseNumber", "NA")
    );
    data.financialYear = nullToNa(
      get(response, "Licenses[0].financialYear", "NA")
    );
    data.tradeName = nullToNa(get(response, "Licenses[0].tradeName", "NA"));
    data.doorNo = nullToNa(
      get(response, "Licenses[0].tradeLicenseDetail.address.doorNo", "NA")
    );
    data.buildingName = nullToNa(
      get(response, "Licenses[0].tradeLicenseDetail.address.buildingName", "NA")
    );
    data.streetName = nullToNa(
      get(response, "Licenses[0].tradeLicenseDetail.address.street", "NA")
    );
    let localityCode = nullToNa(
      get(
        response,
        "Licenses[0].tradeLicenseDetail.address.locality.code",
        "NA"
      )
    );
    data.locality = getMessageFromLocalization(localityCode);
    let cityCode = nullToNa(
      get(response, "Licenses[0].tradeLicenseDetail.address.tenantId", "NA")
    );
    data.city = getMessageFromLocalization(cityCode);
    data.ownerName = nullToNa(
      get(response, "Licenses[0].tradeLicenseDetail.owners[0].name", "NA")
    );
    data.mobileNo = nullToNa(
      get(
        response,
        "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
        "NA"
      )
    );
    data.licenseIssueDate = nullToNa(
      epochToDate(get(response, "Licenses[0].issuedDate", "NA"))
    );
    data.licenseExpiryDate = nullToNa(
      epochToDate(get(response, "Licenses[0].validTo", "NA"))
    );
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
        tradeCategory = nullToNa(tradeCode);
      } else if (tradeCodeArray.length == 2) {
        tradeCategory = nullToNa(tradeCodeArray[0]);
        tradeType = nullToNa(tradeCode);
      } else if (tradeCodeArray.length > 2) {
        tradeCategory = nullToNa(tradeCodeArray[0]);
        tradeType = nullToNa(tradeCodeArray[1]);
      }
    }
    /** End */
    data.tradeCategory = getMessageFromLocalization(tradeCategory);
    data.tradeType = getMessageFromLocalization(tradeType);
    data.address = nullToNa(
      createAddress(
        data.doorNo,
        data.buildingName,
        data.streetName,
        data.locality,
        data.city
      )
    );
    let accessories = response.Licenses[0].tradeLicenseDetail.accessories
      ? response.Licenses[0].tradeLicenseDetail.accessories.length
      : 0;
    data.accessories = nullToNa(accessories);
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
    data.receiptNumber = nullToNa(
      get(response, "Receipt[0].Bill[0].billDetails[0].receiptNumber", "NA")
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
    data.paymentMode = nullToNa(
      get(response, "Receipt[0].instrument.instrumentType.name", "NA")
    );
    data.transactionNumber = nullToNa(
      get(response, "Receipt[0].instrument.transactionNumber", "NA")
    );
    data.bankName = get(response, "Receipt[0].instrument.bank.name", "NA");
    data.branchName = get(response, "Receipt[0].instrument.branchName", null);
    data.bankAndBranch = nullToNa(
      data.bankName && data.branchName
        ? data.bankName + ", " + data.branchName
        : get(data, "bankName", "NA")
    );
    data.paymentDate = nullToNa(
      epochToDate(
        get(response, "Receipt[0].Bill[0].billDetails[0].receiptDate", 0)
      )
    );
    data.g8ReceiptNo = nullToNa(
      get(
        response,
        "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber",
        "NA"
      )
    );
    data.g8ReceiptDate = nullToNa(
      epochToDate(
        get(response, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate", 0)
      )
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
    data.tlRebatePenalty = "NA";
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
