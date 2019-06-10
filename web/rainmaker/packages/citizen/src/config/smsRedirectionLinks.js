import { getQueryArg } from "egov-ui-kit/utils/commons";

const getSmsRedirectionLink = (url) => {
  const redirectionTo = getQueryArg(url, "redirectTo");
  const params = getQueryArg(url, "params");
  const mobileNo = getQueryArg(url, "mobileNo");
  switch (redirectionTo) {
    case "uc-citizen/smsViewReceipt":
      return `/${redirectionTo}?smsLink=true&mobileNo=${mobileNo}&tenantId=${params.split(",")[0]}&receiptNo=${params.split(",")[1]}`;
    default:
      break;
  }
};

export default getSmsRedirectionLink;
