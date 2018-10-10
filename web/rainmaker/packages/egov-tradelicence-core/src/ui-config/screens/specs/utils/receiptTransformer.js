import {
  getReceiptData,
  getSearchResults,
  getMdmsData,
  getUserDataFromUuid
} from "../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import store from "ui-redux/store";

const handleNull = value => {
  let response = value ? value : "";
  return response;
};

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
    data.applicationNumber = handleNull(response.Licenses[0].applicationNumber);
    data.licenseNumber = handleNull(response.Licenses[0].licenseNumber);
    data.financialYear = handleNull(response.Licenses[0].financialYear);
    data.tradeName = handleNull(response.Licenses[0].tradeName);
    data.doorNo = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.doorNo
    );
    data.buildingName = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.buildingName
    );
    data.streetName = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.street
    );
    let localityCode = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.locality.code
    );
    let localityObject = JSON.parse(
      localStorage.getItem("localization_en_IN")
    ).find(item => {
      return item.code == localityCode;
    });
    data.locality = localityObject ? localityObject.message : "";
    data.ownerName = handleNull(
      response.Licenses[0].tradeLicenseDetail.owners[0].name
    );
    data.mobileNo = handleNull(
      response.Licenses[0].tradeLicenseDetail.owners[0].mobileNumber
    );
    data.licenseIssueDate = handleNull(response.Licenses[0].issuedDate);
    data.licenseExpiryDate = handleNull(response.Licenses[0].validTo);
    data.tradeType = handleNull(
      response.Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType
    );
    data.address = createAddress(
      data.doorNo,
      data.buildingName,
      data.streetName,
      data.locality
    );
    let accessories = response.Licenses[0].tradeLicenseDetail.accessories
      ? response.Licenses[0].tradeLicenseDetail.accessories.length
      : 0;
    data.accessories = handleNull(accessories);
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
    data.receiptNumber = handleNull(
      response.Receipt[0].Bill[0].billDetails[0].receiptNumber
    );
    data.amountPaid = handleNull(
      response.Receipt[0].Bill[0].billDetails[0].amountPaid
    );
    data.totalAmount = handleNull(
      response.Receipt[0].Bill[0].billDetails[0].totalAmount
    );
    data.amountDue = handleNull(data.totalAmount - data.amountPaid);
    data.paymentMode = handleNull(
      response.Receipt[0].instrument.instrumentType.name
    );
    data.transactionNumber = handleNull(
      response.Receipt[0].instrument.transactionNumber
    );
    data.bankName = handleNull(response.Receipt[0].instrument.bank.name);
    data.branchName = handleNull(response.Receipt[0].instrument.branchName);
    data.bankAndBranch =
      data.bankName && data.branchName
        ? data.bankName + ", " + data.branchName
        : handleNull(data.bankName);
    data.paymentDate = handleNull(
      epochToDate(response.Receipt[0].Bill[0].billDetails[0].receiptDate)
    );
    data.g8ReceiptNo = handleNull(
      response.Receipt[0].Bill[0].billDetails[0].manualReceiptNumber
    );
    data.g8ReceiptDate = handleNull(
      epochToDate(response.Receipt[0].Bill[0].billDetails[0].manualReceiptDate)
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
    let ulbGrade = handleNull(ulbData.city.ulbGrade);
    let name = handleNull(ulbData.city.name);
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
    data.corporationAddress = handleNull(ulbData.address);
    data.corporationContact = handleNull(ulbData.contactNumber);
    data.corporationWebsite = handleNull(ulbData.domainUrl);
    data.corporationEmail = handleNull(ulbData.emailId);
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
    data.auditorName = handleNull(response.user[0].name);
  }
  store.dispatch(prepareFinalObject("userDataForReceipt", data));
};
