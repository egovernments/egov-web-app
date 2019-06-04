import get from "lodash/get";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "../../../../ui-redux/store";
import { getEmployeeName } from "../utils/index";
import { getMdmsData } from "../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const ifNotNull = value => {
  return !["", "NA", "null", null].includes(value);
};

const nullToNa = value => {
  return ["", "NA", "null", null].includes(value) ? "None" : value;
};

const epochToDate = et => {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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
  img.src = `/pb-egov-assets/${tenantid}/logo.png`;
};

export const loadReceiptData = async response => {
  let data = {};

  if (response.Bill && response.Bill.length > 0) {
    data.receiptDate = epochToDate(
      get(response, "Bill[0].billDetails[0].receiptDate")
    );
    const fromDate = epochToDate(
      get(response, "Bill[0].billDetails[0].fromPeriod")
    );
    const toDate = epochToDate(
      get(response, "Bill[0].billDetails[0].toPeriod")
    );
    data.taxPeriod = `${fromDate} - ${toDate}`;
    data.consumerName = get(response, "Bill[0].payerName");
    data.mobileNumber = get(response, "Bill[0].mobileNumber");
    data.serviceCategory = get(
      response,
      "Bill[0].billDetails[0].businessService"
    ).split(".")[0];
    const serviceType = get(
      response,
      "Bill[0].billDetails[0].businessService"
    ).split(".")[1];
    data.serviceType = serviceType ? serviceType : "NONE";
    data.amountPaid = get(response, "Bill[0].billDetails[0].amountPaid", 0);
    data.totalAmount = get(response, "Bill[0].billDetails[0].totalAmount", 0);
    data.amountDue = data.totalAmount - data.amountPaid;
    data.paymentMode = nullToNa(
      get(response, "instrument.instrumentType.name", "NA")
    );
    data.receiptNumber = get(
      response,
      "Bill[0].billDetails[0].receiptNumber",
      null
    );
    data.g8ReceiptNo = nullToNa(
      get(response, "Bill[0].billDetails[0].manualReceiptNumber", "None")
    );

    const queryObj = [
      {
        key: "ids",
        value: get(response, "auditDetails.createdBy")
      },
      {
        key: "tenantId",
        value: getTenantId()
      }
    ];

    data.createdBy =
      get(response, "instrument.instrumentType.name") !== "Online"
        ? await getEmployeeName(queryObj)
        : "NA";
  }
  return data;
  // store.dispatch(prepareFinalObject("receiptDataForReceipt", data));
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
  // loadApplicationData(applicationNumber, tenant); //PB-TL-2018-09-27-000004
  loadReceiptData(applicationNumber, tenant); //PT-107-001330:AS-2018-08-29-001426     //PT consumerCode
  loadMdmsData(tenant);
};
