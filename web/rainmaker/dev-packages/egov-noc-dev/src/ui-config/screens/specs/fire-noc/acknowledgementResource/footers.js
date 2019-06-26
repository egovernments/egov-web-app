import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import { getBill, ifUserRoleExists } from "../../utils";
import generatePdf from "../../utils/receiptPdf";

export const getRedirectionURL = () => {
  const redirectionURL = ifUserRoleExists("CITIZEN")
    ? "/fire-noc/home"
    : "/inbox";
  return redirectionURL;
};

export const callPGService = async (state, dispatch) => {
  const tenantId = getQueryArg(window.location.href, "tenantId");
  // let callbackUrl = "/fire-noc/paymentRedirectPage";
  let callbackUrl = `${
    window.origin
  }/egov-ui-framework/fire-noc/paymentRedirectPage`;
  try {
    const queryObj = [
      {
        key: "tenantId",
        value: tenantId
      },
      {
        key: "consumerCode",
        value: getQueryArg(window.location.href, "applicationNumber")
      },
      {
        key: "businessService",
        value: "FIRENOC"
      }
    ];
    const billPayload = await getBill(queryObj);
    const taxAndPayments = get(billPayload, "Bill[0].taxAndPayments", []).map(
      item => {
        if (item.businessService === "FIRENOC") {
          item.amountPaid = get(
            billPayload,
            "Bill[0].billDetails[0].totalAmount"
          );
        }
        return item;
      }
    );
    try {
      const requestBody = {
        Transaction: {
          tenantId,
          txnAmount: get(billPayload, "Bill[0].billDetails[0].totalAmount"),
          module: "FIRENOC",
          taxAndPayments,
          billId: get(billPayload, "Bill[0].id"),
          consumerCode: get(billPayload, "Bill[0].billDetails[0].consumerCode"),
          productInfo: "Fire NOC Payment",
          gateway: "AXIS",
          callbackUrl
        }
      };
      const goToPaymentGateway = await httpRequest(
        "post",
        "pg-service/transaction/v1/_create",
        "_create",
        [],
        requestBody
      );
      const redirectionUrl = get(goToPaymentGateway, "Transaction.redirectUrl");
      window.location = redirectionUrl;
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

//Function for go to home button
export const gotoHomeFooter = getCommonApplyFooter({
  gotoHome: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      //downloadReceiptButtonLabel: getLabel
      goToHomeButtonLabel: getLabel({
        labelName: "GO TO HOME",
        labelKey: "NOC_COMMON_BUTTON_HOME"
      })
    },
    // Check this onClickDefinition later again
    onClickDefination: {
      action: "page_change",
      path: `${getRedirectionURL()}`
    }
  }
});

//Function for application success(show those 3 buttons )
export const applicationSuccessFooter = (
  state,
  dispatch,
  applicationNumber,
  tenant
) => {
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        //downloadReceiptButtonLabel: getLabel
        goToHomeButtonLabel: getLabel({
          labelName: "GO TO HOME",
          labelKey: "NOC_COMMON_BUTTON_HOME"
        })
      },
      // Check this onClickDefinition later again
      onClickDefination: {
        action: "page_change",
        path: `${getRedirectionURL()}`
      }
    },
    downloadFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "290px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadFormButtonLabel: getLabel({
          labelName: "DOWNLOAD CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_DOWN_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: () => {
          generatePdf(state, dispatch, "application_download");
        }
      }
    },
    printFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "250px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        printFormButtonLabel: getLabel({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_PRINT_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: () => {
          generatePdf(state, dispatch, "application_print");
        }
      }
    },
    proceedToPaymentButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        proceedToPaymentButtonLabel: getLabel({
          labelName: "Proceed to payment",
          labelKey: "NOC_PROCEED_PAYMENT"
        })
      },
      //Add onClickDefination and RoleDefination later
      onClickDefination: {
        action: "page_change",
        path:
          process.env.REACT_APP_SELF_RUNNING === "true"
            ? `/egov-ui-framework/fire-noc/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=FIRENOC`
            : `/fire-noc/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=FIRENOC`
      },
      roleDefination: {
        rolePath: "user-info.roles",
        action: "PAY"
        // roles: ["NOC_CEMP", "SUPERUSER"]
      }
    },
    makePayment: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        submitButtonLabel: getLabel({
          labelName: "MAKE PAYMENT",
          labelKey: "NOC_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: callPGService
      },
      roleDefination: {
        rolePath: "user-info.roles",
        roles: ["CITIZEN"],
        action: "PAY"
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? true : true
    }
  });
};

//Function for approval footer buttons
export const approvalSuccessFooter = getCommonApplyFooter({
  //Call gotoHome
  downloadLicenseButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadLicenseButtonLabel: getLabel({
        labelName: "DOWNLOAD FIRE-NOC",
        labelKey: "NOC_APPROVAL_CHECKLIST_BUTTON_DOWN_LIC"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        generatePdf(state, dispatch, "certificate_download");
      }
    }
  },
  printNOCButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      printLicenseButtonLabel: getLabel({
        labelName: "PRINT FIRE-NOC",
        labelKey: "NOC_APPROVAL_CHECKLIST_PRINT_LIC"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        generatePdf(state, dispatch, "certificate_print");
      }
    }
  }
});

//Function for payment failure(retry button)
export const paymentFailureFooter = (applicationNumber, tenant) => {
  return getCommonApplyFooter({
    //Call gotoHome
    retryPayment: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: getLabel({
          labelName: "RETRY",
          labelKey: "NOC_PAYMENT_RETRY"
        })
      }
      //Check this onclick later again
      // onClickDefination: {
      //   action: "page_change",
      //   path: `${getRedirectionURL}/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`
      // }
    }
  });
};

//Function for payment success(Show buttons for download and print receipts)
export const paymentSuccessFooter = () => {
  return getCommonApplyFooter({
    //call gotoHome
    downloadReceiptButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: getLabel({
          labelName: "DOWNLOAD RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_DOWNLOAD_RECEIPT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          generatePdf(state, dispatch, "receipt_download");
        }
      }
    },
    printReceiptButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        printReceiptButtonLabel: getLabel({
          labelName: "PRINT RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_PRINT_RECEIPT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          generatePdf(state, dispatch, "receipt_print");
        }
      }
    },
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        goToHomeButtonLabel: getLabel({
          labelName: "GO TO HOME",
          labelKey: "NOC_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path:
          process.env.REACT_APP_SELF_RUNNING === "true"
            ? `/egov-ui-framework/fire-noc/search`
            : `/fire-noc/search`
      }
      // visible: false
    }
  });
};

//Write a function using map to return buttons
